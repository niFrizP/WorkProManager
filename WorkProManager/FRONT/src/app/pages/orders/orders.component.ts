import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

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
deleteOrder(arg0: string) {
throw new Error('Method not implemented.');
}
  orders = [
    { fecha: '2024-06-01', otId: 'SO1001', equipo: 'Acme Corporation', estado: 'Cerrado', costo: 2500 },
    { fecha: '2024-06-02', otId: 'SO1002', equipo: 'Bravo Solutions', estado: 'Finalizado', costo: 1200 },
    { fecha: '2024-06-02', otId: 'SO1003', equipo: "Charlie's Workshop", estado: 'En proceso', costo: 500 },
    { fecha: '2024-06-03', otId: 'SO1004', equipo: 'Delta Retail', estado: 'En proceso', costo: 750 },
    { fecha: '2024-06-04', otId: 'SO1005', equipo: 'Echo Enterprises', estado: 'Finalizado', costo: 3000 },
    { fecha: '2024-06-05', otId: 'SO1006', equipo: 'Foxtrot Media', estado: 'Cerrado', costo: 1150 },
    { fecha: '2024-06-06', otId: 'SO1007', equipo: 'Golf Goods Inc.', estado: 'Cerrado', costo: 2300 },
    // Agrega más órdenes si es necesario
  ];

  filteredOrders = this.orders;
  page = 1;
  itemsPerPage = 10;

  constructor() {}

  ngOnInit(): void {}

  filterOrders(filter: string): void {
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
