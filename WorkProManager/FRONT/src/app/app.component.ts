import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClienteService } from './services/cliente.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrdersModule } from './pages/orders/orders.module';

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet, CommonModule, OrdersModule, SidebarComponent, NgxPaginationModule ,ReactiveFormsModule, FormsModule, HttpClientModule, ToastrModule],
=======
  imports: [
    RouterOutlet,
    CommonModule,
    SidebarComponent,
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    BrowserAnimationsModule,
    ToastrModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'WorkProManager';
}
