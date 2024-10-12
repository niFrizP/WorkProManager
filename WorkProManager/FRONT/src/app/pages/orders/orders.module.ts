import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './orders.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
     
  ],
  exports: [
    
  ],
})
export class OrdersModule { }