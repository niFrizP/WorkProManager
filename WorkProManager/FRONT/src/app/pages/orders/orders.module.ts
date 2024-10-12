import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './orders.component';
=======
import { CommonModule } from '@angular/common'; // Para usar directivas *ngFor y *ngIf
import { NgxPaginationModule } from 'ngx-pagination'; // Para la paginación
import { FormsModule } from '@angular/forms'; // Para el filtro si lo usas con formularios
import { OrdersComponent } from './orders.component'; // Asegúrate de que la ruta sea correcta
>>>>>>> c59ed2432fa62960f41854a4b1d314023022219c

@NgModule({
  declarations: [
  ],
  imports: [
<<<<<<< HEAD
    CommonModule,
    NgxPaginationModule,
    FormsModule,
     
  ],
  exports: [
    
  ],
})
export class OrdersModule { }
=======
    CommonModule, // Necesario para las directivas como *ngFor y *ngIf
    NgxPaginationModule, // Módulo para manejar la paginación
    FormsModule, // Importa si vas a utilizar formularios
    OrdersComponent, // Importa el componente standalone
  ],
  exports: [
    OrdersComponent, // Exporta el componente si quieres usarlo en otros módulos
  ],
})
export class OrdersModule {}
>>>>>>> c59ed2432fa62960f41854a4b1d314023022219c
