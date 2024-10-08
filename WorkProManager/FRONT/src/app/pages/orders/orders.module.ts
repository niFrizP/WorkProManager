import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar directivas *ngFor y *ngIf
import { NgxPaginationModule } from 'ngx-pagination'; // Para la paginación
import { FormsModule } from '@angular/forms'; // Para el filtro si lo usas con formularios
import { OrdersComponent } from './orders.component'; // Asegúrate de que la ruta sea correcta

@NgModule({
  declarations: [
  ],
  imports: [
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
