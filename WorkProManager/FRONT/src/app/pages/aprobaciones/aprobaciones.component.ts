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
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-aprobaciones',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, RouterModule, FormsModule],
  templateUrl: './aprobaciones.component.html',
  styleUrl: './aprobaciones.component.css'
})
export class AprobacionesComponent {

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
  filteredOrders: newOrder[] = []; // Cambiado a newOrder[]
  filteredUsers: Usuario[] = [];
  filteredServicios: Servicio[] = [];
  page = 1;
  itemsPerPage = 10;

  years = [2024, 2023, 2022]; // Asegúrate de rellenar con los años disponibles


  constructor(
    private ordereliminadaService: OrdereliminadaService,
    private orderService: OrderService,
    private usuarioService: UsuarioService,
    private equipoService: EquipoService,
    private clienteService: ClienteService,
    private servicioService: ServicioService
  ) {}

  ngOnInit(): void {
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
    this.orderService.getlistnewOrders().subscribe(
      (data: newOrder[]) => {
        this.newOrders = data.filter(newOrder => newOrder.id_estado === 2); // Filtrar solo órdenes con id_estado == 2
        this.filteredOrders = this.newOrders; // Inicializar filteredOrders
        console.log(this.newOrders.map(newOrder => newOrder.EstadoOT.tipo_est));
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }

  filterOrders() {
    this.filteredOrders = this.newOrders
      .filter(newOrder => this.selectedStatus === 'todas' || newOrder.EstadoOT.tipo_est.toLowerCase() === this.selectedStatus)
      .filter(newOrder => this.selectedMonth === 0 || new Date(newOrder.fecha).getMonth() + 1 === this.selectedMonth)
      .filter(newOrder => this.selectedYear === 0 || new Date(newOrder.fecha).getFullYear() === this.selectedYear)
      .filter(newOrder => !this.searchRutCliente || newOrder.rut_cliente.toString().toLowerCase().includes(this.searchRutCliente.toLowerCase()))
      .filter(newOrder => !this.selectedDate || new Date(newOrder.fecha).toDateString() === this.selectedDate?.toDateString())
      .filter(newOrder => !this.searchEquipo || newOrder.Equipo.mod_equipo.toString().toLowerCase().includes(this.searchEquipo.toString().toLowerCase()))
      .filter(newOrder => this.selectedUsuario === 'todos' || newOrder.Usuario.nom_usu.toLowerCase() === this.selectedUsuario.toLowerCase())// Filtro de usuario
      .filter(newOrder => this.selectedServicio === 'todos' || newOrder.Servicio.nom_serv.toLowerCase() === this.selectedServicio.toLowerCase()); // Filtro de servicio
  }

  filterUsers() {
    this.filteredUsers = this.usuarios
      .filter(usuario => this.selectedUsuario === 'todos' || usuario.nom_usu.toLowerCase() === this.selectedUsuario)
  }

  filterServicios() {
    this.filteredServicios = this.servicios
      .filter(servicio => this.selectedServicio === 'todos' || servicio.nom_serv.toLowerCase() === this.selectedServicio)
  } 

  deleteOrder(id_ot: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta orden?')) {
      this.orderService.getOrder(id_ot).subscribe(
        (order: Order) => {
          this.ordereliminadaService.saveOrder(order).subscribe(
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

  
  aprobarOT(id_ot: number | undefined): void {
    window.alert(`Estás a punto de aprobar la orden con ID: ${id_ot}`);

    const orderId = id_ot ?? 0; // O cualquier otro valor predeterminado que consideres apropiado

  
    console.log(orderId);
    this.orderService.updateOrderState(orderId, 3).subscribe(
      () => {
        console.log('Orden aprobada');
        this.loadOrders(); // Actualizar la lista de órdenes

      },
      (error) => {
        console.error('Error aprobando la orden', error);
      }
    );
  }
  

  
  

  onPageChange(page: number): void {
    this.page = page;
  }
}

