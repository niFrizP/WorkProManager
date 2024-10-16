import { Component, OnInit } from '@angular/core';
import { QueryService } from '../../services/query.service';
import { newOrder } from '../../interfaces/newOrder';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalOrdersByYear: number = 0;  // Variable para el total
  ordersOfTheDay: number = 0;
  ordersByofEstadoSum: number = 0;
  errorMessage: string = '';
  ordersByEstado: newOrder[] = [];
  ordersByYear: newOrder[] = [];
  ordersByDay: newOrder[] = [];
  ordersByEstadoSum: newOrder[] = [];
  constructor(private queryService: QueryService) {}

  ngOnInit(): void {
    this.loadOrdersByYear();
    this.loadOrdersOfTheDay();
    this.loadOrdersByEstadoSum();
  }

  // Cargar las órdenes por año y calcular el total
  loadOrdersByYear(): void {
    this.queryService.getOrdersByYear().subscribe(
      (data: newOrder[]) => {
        this.ordersByYear = data;
        console.log(this.ordersByYear);
        
        // Extraer el año y el total
        if (this.ordersByYear.length > 0) {
          const { año, total } = this.ordersByYear[0];
          // Asignar a las variables
          this.totalOrdersByYear = total; // Asignar total a la variable existente
        }
      },
      (error) => {
        console.error('Error fetching orders by year:', error);
        this.errorMessage = 'Error al cargar las órdenes por año';
      }
    );
  }

  loadOrdersOfTheDay(): void {
    this.queryService.getOrdersByDay().subscribe({
      next: (data: newOrder[]) => {
        this.ordersByDay = data;
      },
      // ... handle error and complete if needed
    });

    if(this.ordersByDay.length > 0){
      const { fecha, total } = this.ordersByDay[0];
      this.ordersOfTheDay = total;
      console.log(this.ordersOfTheDay);
      
    }

    }
  

  loadOrdersByEstadoSum(): void {
    this.queryService.getOrdersByEstadoSum().subscribe({
      next: (data: newOrder[]) => {
        this.ordersByEstadoSum = data;
        console.log("ORDENES POR ESTADO SUM");
        console.log(this.ordersByEstadoSum);

      },
      // ... handle error and complete if needed
    });

    if(this.ordersByEstadoSum.length > 0){
      const { id_estado, total } = this.ordersByEstadoSum[0];
      console.log(total);
      this.ordersByofEstadoSum = total;
    }
  }


}
