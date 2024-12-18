/* import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar directivas *ngFor y *ngIf
import { NgxPaginationModule } from 'ngx-pagination'; // Para la paginación
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Para el filtro si lo usas con formularios
import { OrdersComponent } from './orders.component'; // Asegúrate de que la ruta sea correcta
import { RouterModule } from '@angular/router'; // Para la navegación
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule, // Necesario para la navegacion
    CommonModule, // Necesario para las directivas como *ngFor y *ngIf
    NgxPaginationModule, // Módulo para manejar la paginación
    FormsModule, // Importa si vas a utilizar formularios
    OrdersComponent, // Importa el componente standalone
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  exports: [
    OrdersComponent, // Exporta el componente si quieres usarlo en otros módulos
  ],
})
export class OrdersModule {}
 */