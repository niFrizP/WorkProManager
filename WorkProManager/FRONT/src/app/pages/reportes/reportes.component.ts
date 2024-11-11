import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleOTService } from '../../services/detalle_ot.service';
import { EstadoOT } from '../../interfaces/estadoot';
import { EstadoOTService } from '../../services/estado_ot.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, RouterModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit {

  numericError: string = '';  // Variable para almacenar el mensaje de error
  isSubmenuOpen: number | null = null; // Controla la visibilidad del submenú

  selectedEstadoID: number | null = null;

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
  isMenuOpen = false;
  servicios: Servicio[] = [];
  selectedMonth: number = 0;
  selectedEstadoName = '';
  selectedYear: number = 0;
  selectedEquipo: string = '';
  selectedStatus: string = 'todas';
  selectedUsuario: string = 'todos';
  selectedDate: Date | null = null;
  selectedServicio: string = 'todos';
  equipo: Equipo = {};
  searchRutCliente: string = '';
  searchEquipo: string = '';
  searchUsuario: string = '';
  searchServicio: string = '';
  filteredOrders: newOrder[] = []; // Cambiado a newOrder[]
  filteredUsers: Usuario[] = [];
  estadosOT: EstadoOT[] = [];
  filteredServicios: Servicio[] = [];
  page = 1;
  form: FormGroup;
  estados: EstadoOT[] = [];
  itemsPerPage = 10;
  id_ot: number = 0; // Declare the id_ot property

  years = [2024, 2023, 2022]; // Asegúrate de rellenar con los años disponibles


  constructor(
    private ordereliminadaService: OrdereliminadaService,
    private _orderService: OrderService,
    private orderService: OrderService,
    private usuarioService: UsuarioService,
    private equipoService: EquipoService,
    private clienteService: ClienteService,
    private detalleOTService: DetalleOTService,
    private servicioService: ServicioService,
    private estadoOTService: EstadoOTService,
    public authService: AuthService,
    private fb: FormBuilder,
  ) {  this.form = this.fb.group({
    id_estado_ot: this.selectedEstadoID
  });}

  ngOnInit(): void {
    this.loadOrders();
    this.loadEstados();
    this.loadUsers();
    this.loadServicios();

   
  }

  filterOrdersByServicio(servicio: string) {
    this.selectedServicio = servicio;
    this.filterOrders();
  }

  filterOrdersByRutCliente() {
    this.filterOrders();
  }

  filterOrdersByStatus(status: string) {
    this.selectedStatus = status;
    this.filterOrders();
  }
  filterOrdersByUsuario(usuario: string) {
    this.selectedUsuario = usuario;
    this.filterOrders();
  }

  

  // Actualiza el formulario cuando cambia la selección
  public onUserChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    const selectedEstado = this.estados.find(estado => estado.id_estado_ot?.toString() === selectedId);
    
    if (selectedEstado) {
      this.selectedEstadoName = selectedEstado.nom_estado_ot;
      this.selectedEstadoID = selectedEstado.id_estado_ot ?? null;
      console.log(this.selectedEstadoID);
      
      // Actualiza el valor en el formulario
      this.form.patchValue({ id_estado_ot: this.selectedEstadoID });
      console.log(this.form.value);
      
      // Emitir el evento al componente padre

      

      this.estadoUpdated(this.id_ot,this.selectedEstadoID??0);


      
      // Cerrar el menú
      this.isMenuOpen = false; // Cerrar el submenú
    }
  }
  
  filterOrdersByMonthYear(month: number, year: number) {
    this.selectedMonth = month;
    this.selectedYear = year;
    this.filterOrders();
  }

  

  filterOrdersByEquipo() {
    this.filterOrders();
  }

  toggleMenu(id_ot: number): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.id_ot = id_ot;
    console.log(this.id_ot);
  }

  filterUsersByRut(): any[] {
    const userRut = this.authService.getUserId(); // Obtén el `rut_usuario` desde `authService`
    return this.usuarios.filter(usuario => usuario.rut_usuario === userRut);
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

  loadEstados() {
    this.estadoOTService.getListEstadosOT().subscribe(data => {
      this.estados = data;
    });
  }

  toggleSubmenu(id_ot: number ) {
    // Alterna el submenú solo para el registro seleccionado
    this.isSubmenuOpen = this.isSubmenuOpen === id_ot ? null : id_ot;
  }
  
  loadOrders(): void {
    this.orderService.getlistnewOrders().subscribe(
      (data: newOrder[]) => {
        this.newOrders = data;
        this.filteredOrders = this.newOrders; // Inicializar filteredOrders
        console.log(this.newOrders.map(newOrder => newOrder.EstadoOT.nom_estado_ot));
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }

  filterOrders() {
    this.filteredOrders = this.newOrders
      .filter(newOrder => this.selectedStatus === 'todas' || newOrder.EstadoOT.nom_estado_ot.toLowerCase() === this.selectedStatus)
      .filter(newOrder => this.selectedMonth === 0 || new Date(newOrder.fec_entrega).getMonth() + 1 === this.selectedMonth)
      .filter(newOrder => this.selectedYear === 0 || new Date(newOrder.fec_entrega).getFullYear() === this.selectedYear)
      .filter(newOrder => !this.searchRutCliente || newOrder.rut_cliente.toString().toLowerCase().includes(this.searchRutCliente.toLowerCase()))
      .filter(newOrder => !this.selectedDate || new Date(newOrder.fec_entrega).toDateString() === this.selectedDate?.toDateString())
      .filter(newOrder => !this.searchEquipo || newOrder.Equipo.mod_equipo.toString().toLowerCase().includes(this.searchEquipo.toString().toLowerCase()))
      .filter(newOrder => this.selectedUsuario === 'todos' || newOrder.Usuario.nom_usu.toLowerCase() === this.selectedUsuario.toLowerCase())// Filtro de usuario
  }

  filterUsers() {
    this.filteredUsers = this.usuarios
      .filter(usuario => this.selectedUsuario === 'todos' || usuario.nom_usu.toLowerCase() === this.selectedUsuario)
  }

  filterServicios() {
    this.filteredServicios = this.servicios
      .filter(servicio => this.selectedServicio === 'todos' || servicio.nom_serv.toLowerCase() === this.selectedServicio)
  } 

  deleting(id_ot: number): void {
    this.deleteDetalleOTByOtId(id_ot);
    this.deleteOrder(id_ot);
  }

  


  deleteDetalleOTByOtId(id_ot: number): void {
    this.detalleOTService.deleteDetalleOTByOtId(id_ot).subscribe(
      () => {
        console.log('Detalle OT eliminado');
        this.loadOrders();
      },
      (error) => {
        console.error('Error eliminando el detalle OT', error);
      }
    );
  }


  deleteOrder(id_ot: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta orden?')) {




      this.orderService.getNewOrder(id_ot).subscribe(
        (order: newOrder) => {
          this.orderService.saveOrder(order).subscribe(
            () => {
              console.log('Orden registrada como eliminada', order);
              this.orderService.deleteOrders(id_ot).subscribe(
                () => {
                  console.log('Orden eliminada');
                  this.loadOrders(); // Actualizar la lista de órdenes
                },
                (error) => {
                  console.error('Error eliminando la orden', error);
                  alert('Hubo un error al intentar eliminar la orden.');
                }
              );
            },
            (error) => {
              console.error('Error registrando la orden eliminada', error);
              alert('Hubo un error al registrar la orden eliminada.');
            }
          );
        },
        (error) => {
          console.error('Error obteniendo la orden', error);
          alert('No se pudo obtener la orden para eliminar.');
        }
      );
    }
  }

  updateOrder(id_ot:number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._orderService.updateOrderState(id_ot, 3).subscribe(
        
        (data) => {
          console.log(id_ot);
          console.log("updateOrder");
          console.log(data);
          resolve();
        },
        (error) => {
          console.error('Error al cargar los detalles:', error);
          reject();
        }
      );
      
    });
  }
  
  confirmOrderCompletion(id_ot: number): void| undefined {
      this.updateOrder(id_ot)
  
}

  onPageChange(page: number): void {
    this.page = page;
  }

 

  estadoUpdated(id_ot: number | null ,estadoId: number | null) {
    // Lógica para manejar la actualización del estado en el componente padre
    this.orderService.updateOrderState(id_ot ?? 0, estadoId ?? 0).subscribe(
      () => {
        console.log('Estado actualizado');
        this.loadOrders();
      },
      (error) => {
        console.error('Error actualizando el estado', error);
      }
    );
  }
  
}
