import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order';
import { UsuarioService } from '../../services/usuario.service';
import { EquipoService } from '../../services/equipo.service';
import { ClienteService } from '../../services/cliente.service';
import { Usuario } from '../../interfaces/usuario';
import { Equipo } from '../../interfaces/equipo';
import { Cliente } from '../../interfaces/cliente';
import { Servicio } from '../../interfaces/servicio';
import { ServicioService } from '../../services/servicio.service';
import { OrdereliminadaService } from '../../services/ordereliminada.service';
import { newOrder } from '../../interfaces/newOrder';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { DetalleOTService } from '../../services/detalle_ot.service';
import { DetalleOT } from '../../interfaces/detalle_ot';
import { error } from 'node:console';
import { ReporteService } from '../../services/reporte.service';
import { response } from 'express';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud } from '../../interfaces/solicitud';
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-create-reporte',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, RouterModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, FormsModule, ModalComponent],
  templateUrl: './create-reporte.component.html',
  styleUrls: ['./create-reporte.component.css'],
})
export class CreateReportComponent implements OnInit {


  numericError: string = '';  // Variable para almacenar el mensaje de error


  months = [
    { value: 1, name: 'Enero' },
    { value: 2, name: 'Febrero' },
    { value: 3, name: 'Marzo' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Mayo' },
    { value: 6, name: 'Junio' },
    { value: 7, name: 'Julio' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Septiembre' },
    { value: 10, name: 'Octubre' },
    { value: 11, name: 'Noviembre' },
    { value: 12, name: 'Diciembre' }
  ];

  orders: Order[] = [];
  newOrders: newOrder[] = [];
  usuarios: Usuario[] = [];
  clientes: Cliente[] = [];
  servicios: Servicio[] = [];
  selectedMonth: number = 0;
  selectedYear: number = 0;
  selectedEquipo: string = '';
  selectedStatus: string = 'todas';
  selectedUsuario: string = 'todos';
  selectedDate: Date | null = null;
  selectedServicio: string = 'todos';
  detalleOT: DetalleOT[] = [];
  equipo: Equipo = {};
  searchRutCliente: string = '';
  id_ot: number = 0;
  searchEquipo: string = '';
  searchUsuario: string = '';
  searchServicio: string = '';
  filteredDetalles: DetalleOT[] = []; // Cambiado a newOrder[]
  filteredUsers: Usuario[] = [];
  filteredServicios: Servicio[] = [];
  page = 1;
  solicitudes:Solicitud[] = [];
  itemsPerPage = 10;
  rut_receptorActual: Number = 0; // Cambiar por el rut del usuario actual

  years = [2024, 2023, 2022]; // Asegúrate de rellenar con los años disponibles
  isModalOpen = true;

  nuevoReporte = {
    titulo: '',
    descripcion: '',
    usuario: '',
    servicio: '',
    fecha: ''
  }


  constructor(
    private ordereliminadaService: OrdereliminadaService,
    private orderService: OrderService,
    private usuarioService: UsuarioService,
    private aRouter: ActivatedRoute,
    private equipoService: EquipoService,
    private clienteService: ClienteService,
    private detalleOTService: DetalleOTService,
    private servicioService: ServicioService,
    private reporteService: ReporteService,
    private solicitudService: SolicitudService,
    private auth:AuthService
  ) {

    this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id'));
   
  }

  ngOnInit(): void {
        this.rut_receptorActual = this.auth.getIdLocal() ?? 0;
        this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id'));
        this.updateSolicitudOnLoad();


        
    console.log(this.id_ot);
    
    this.loadDetalles(this.id_ot);
    this.loadUsers();
    this.loadServicios();
    

  }

  confirmarDesmarcar(id_ot: number, id_serv: number) {
    const confirmation = window.confirm('¿Estás seguro que quieres eliminar el estado del servicio?');
    if (confirmation) {
      this.desmarcarEstado(id_ot, id_serv);
    } else {
      console.log('Eliminación cancelada');
    }
  }



  desmarcarEstado(id_ot: number, id_serv: number): void {
    this.detalleOTService.updateDetalleOTByDigito(id_ot, id_serv, 0).subscribe({
      next: () => {
        console.log('Estado updated successfully');
        this.loadDetalles(this.id_ot);
      },
    });

    this.solicitudService.getSolByOt(this.id_ot).subscribe((data: Solicitud[]) => {
      this.solicitudes = data.reverse();
      console.log(this.solicitudes);
      if(this.solicitudes[0].isView == true){
        this.solicitudService.updateSolicitudByView(this.solicitudes[0].id_sol!, false).subscribe({
          next: () => {
            console.log('Solicitud updated successfully');
          },
        }); 

        if(this.solicitudes[0].id_estado_ot == 4){
        this.solicitudService.deleteSolicitudes(this.solicitudes[0].id_sol!).subscribe({
          next: () => {
            console.log('Solicitud deleted successfully');
          },
        });}
      }


    })
  }

  openModal(event:Event) {

    event.preventDefault(); // Esto evita que el botón haga submit del formulario
    this.isModalOpen = true;
    this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id'));
    console.log('Abriendo modal con id_ot:', this.id_ot);  // Verifica que el id_ot se pasa al abrir el modal

  }

  

  updateSolicitudOnLoad() {
    this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id'));
    this.solicitudService.getSolByOt(this.id_ot).subscribe((data: Solicitud[]) => {
      this.solicitudes = data.reverse();
      console.log(this.solicitudes);

      
      
if(this.solicitudes[0].isView == false){

   this.solicitudService.updateSolicitudByView(this.solicitudes[0].id_sol!, true).subscribe({
      next: () => {
        console.log('Solicitud updated successfully');
        console.log(this.solicitudes[0].id_sol);
      },
    });   

    this.solicitudService.updateSolicitudByFecha(this.solicitudes[0].id_sol!, new Date).subscribe({
      next: () => {
        console.log('Solicitud updated successfully');
      },
    });   
  }

  })
}

  closeModal() {
    this.isModalOpen = false;
  }

  loadUsers(): void {
    this.usuarioService.getListUsuarios().subscribe(
      (data: Usuario[]) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  loadServicios(): void {
    this.servicioService.getListServicios().subscribe(
      (data: Servicio[]) => {
        this.servicios = data;
      },
      (error) => {
        console.error('Error fetching services', error);
      }
    );
  }
  
  loadDetalles(id: number): void {
    this.detalleOTService.getListDetalleOTByOTId(id).subscribe(
      (data: DetalleOT[]) => {
        this.detalleOT = data;
        this.filteredDetalles = this.detalleOT;
      },
      (error) => {
        console.error('Error fetching detalles', error);
      }
    );
  }


  deleting(id_ot: number,id_serv: number): void {


    const remainingServicesCount = Number(this.detalleOTService.getCountDetalleOT(this.id_ot));

   
      this.detalleOTService.deleteDetalleOT(id_ot, id_serv).subscribe(
        () => {
          this.loadDetalles(this.id_ot);
        }
      );
    
  }
  
  onSubmit(): void {
    this.reporteService.createReporte(this.nuevoReporte).subscribe(
      response => {
        console.log('Reporte Creado', response);
      },
      error => {
        console.error('Errror creando el reporte', error);
      }
    );
  }

  onPageChange(page: number): void {
    this.page = page;
  }
}