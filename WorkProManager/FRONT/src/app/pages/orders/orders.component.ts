import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { DetalleOTService } from '../../services/detalle_ot.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { OrderService } from '../../services/order.service';
import { UsuarioService } from '../../services/usuario.service';
import { EquipoService } from '../../services/equipo.service';
import { ClienteService } from '../../services/cliente.service';
import { ServicioService } from '../../services/servicio.service';  
import { Order } from '../../interfaces/order';
import { newOrder } from '../../interfaces/newOrder';
import { Usuario } from '../../interfaces/usuario';
import { Cliente } from '../../interfaces/cliente';
import { Servicio } from '../../interfaces/servicio';
import { Equipo } from '../../interfaces/equipo';
import { OrdereliminadaService } from '../../services/ordereliminada.service';
import { AuthService } from '../../services/auth.service';
import { QueryService } from '../../services/query';
import { CronometroComponent } from '../../components/cronometro/cronometro.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule,CronometroComponent, RouterModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('slideInOut',[
      state('true', style({
        height: '*',
        opacity: 1,
        overflow: 'hidden'
      })),
      state('false', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden'
      })),
      transition('true <=> false', animate('300ms ease-in-out'))
    ])
  ],
})
export class OrdersComponent implements OnInit {

  menuAbierto: { [key: string]: boolean } = {
    filtrosGenerales: false,
    filtroEstado: false,
    filtroUsuario: false,
    filtroServicio: false,
    filtroFecha: false,
    filtrosCliente: false,
    filtroEquipo: false
  };

  toggleMenu(menu: string): void{
    this.menuAbierto[menu] = !this.menuAbierto[menu];
    console.log(this.menuAbierto);
  }

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
  equipo: Equipo = {};
  searchRutCliente: string = '';
  searchEquipo: string = '';
  searchUsuario: string = '';
  searchServicio: string = '';
  searchRut: string = '';
  filteredOrders: newOrder[] = []; // Cambiado a newOrder[]
  filteredUsers: Usuario[] = [];
  filteredServicios: Servicio[] = [];
  page = 1;
  rut_usuario: number = 0;
  itemsPerPage = 10;
  rol_id: number = 0;

  years = [2024, 2023, 2022]; // Asegúrate de rellenar con los años disponibles


  constructor(
    private ordereliminadaService: OrdereliminadaService,
    private orderService: OrderService,
    private usuarioService: UsuarioService,
    private equipoService: EquipoService,
    private queryService:QueryService,
    private clienteService: ClienteService,
    private detalleOTService: DetalleOTService,
    private servicioService: ServicioService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {

    this.rut_usuario = this.authService.getUserId() ?? 0; // Obtén el `rut_usuario` desde
    this.rol_id = this.authService.getRolId() ?? 0; // Obtén el `rol_id` desde `authService`
    console.log(this.rut_usuario)
    console.log(this.rol_id)
    this.loadOrders();

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

  
  filterOrdersByMonthYear(month: number, year: number) {
    this.selectedMonth = month;
    this.selectedYear = year;
    this.filterOrders();
  }

  

  filterOrdersByEquipo() {
    this.filterOrders();
  }

  
  filterOrdersByRutUsuario() {
    this.filterOrders();
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
  
  loadOrders(): void {
    console.log(this.rut_usuario)

    if(this.rol_id == 2){

      this.queryService.getOrdersByUsuario(this.rut_usuario).subscribe(
        (data: newOrder[]) => {
          this.newOrders = data;

          this.filteredOrders = this.newOrders; // Inicializar filteredOrders
          this.sortOrders(this.newOrders);
          console.log(this.newOrders.map(newOrder => newOrder.EstadoOT.nom_estado_ot));

          
        },
        (error) => {
          console.error('Error fetching orders', error);
        }
      );

    }else{
    
    this.orderService.getlistnewOrders().subscribe(
      (data: newOrder[]) => {
        this.newOrders = data;
        this.filteredOrders = this.newOrders; // Inicializar filteredOrders
        console.log(this.newOrders.map(newOrder => newOrder.EstadoOT.nom_estado_ot));
        this.sortOrders(this.newOrders);

      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }
}

sortOrders(newOrders: any[]): any[] {
  console.log("hola")
  console.log(newOrders);

  return newOrders.sort((a, b) => {
    // Primero, las órdenes cuyo isview es true
    if (a.VistaSolicitud.isview && !b.VistaSolicitud.isview) {
      return -1;
    }
    if (!a.VistaSolicitud.isview && b.VistaSolicitud.isview) {
      return 1;
    }
    return 0;  // Si ambos tienen el mismo valor en isview, no cambiamos el orden
  });
}


  filterOrders() {
    this.filteredOrders = this.newOrders
      .filter(newOrder => this.selectedStatus === 'todas' || newOrder.EstadoOT.nom_estado_ot.toLowerCase() === this.selectedStatus)
      .filter(newOrder => this.selectedMonth === 0 || new Date(newOrder.fec_entrega).getMonth() + 1 === this.selectedMonth)
      .filter(newOrder => this.selectedYear === 0 || new Date(newOrder.fec_entrega).getFullYear() === this.selectedYear)
      .filter(newOrder => !this.searchRutCliente || newOrder.rut_cliente.toString().toLowerCase().includes(this.searchRutCliente.toLowerCase()))
      .filter(newOrder => !this.selectedDate || new Date(newOrder.fec_entrega).toDateString() === this.selectedDate?.toDateString())
      .filter(newOrder => !this.searchEquipo || newOrder.Equipo.mod_equipo.toString().toLowerCase().includes(this.searchEquipo.toString().toLowerCase()))
      .filter(newOrder => !this.searchUsuario || newOrder.rut_usuario.toString().toLowerCase().includes(this.searchUsuario.toLowerCase()))
      .filter(newOrder => this.selectedUsuario === 'todos' || newOrder.Usuario.nom_usu.toLowerCase() === this.selectedUsuario.toLowerCase())// Filtro de usuario

      this.filteredOrders = this.sortOrders(this.filteredOrders);

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

  filterUsersByRut(): any[] {
    const userRut = this.authService.getUserId(); // Obtén el `rut_usuario` desde `authService`
    return this.usuarios.filter(usuario => usuario.rut_usuario === userRut);
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



     

  
  

  
  

  onPageChange(page: number): void {
    this.page = page;
  }
}
