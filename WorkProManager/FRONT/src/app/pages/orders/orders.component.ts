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
import { newOrder } from '../../interfaces/newOrder';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
onFilterChange($event: Event) {
throw new Error('Method not implemented.');
}

  orders: Order[] = [];
  newOrders: newOrder[] = [];
  usuarios: Usuario[] = [];
  clientes: Cliente[] = [];
  servicios: Servicio[] = [];
  equipo: Equipo = {};

  
  


  filteredOrders = this.orders;
  page = 1;
  itemsPerPage = 10;

  constructor(private orderService: OrderService ,private usuarioService: UsuarioService, private equipoService: EquipoService, private clienteService: ClienteService, private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getlistnewOrders().subscribe(
      (data: newOrder[]) => {
        this.newOrders = data;
        console.log(this.newOrders.map(newOrder => newOrder.Equipo));
        
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }

 
  filterOrders(filter: string | null): void {
    if (filter === 'todas') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(order => order.estado.toLowerCase() === filter);
    }
    this.page = 1; // Reiniciar a la primera página después del filtrado
  }

  onPageChange(page: number): void {
    this.page = page;
  }

  

}
