import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from './services/cliente.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrdersModule } from './pages/orders/orders.module'; // manten si es necesario
import { SubmenuComponent } from './components/submenu-component/submenu-component.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    OrdersModule,
    NgxPaginationModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'WorkProManager';



}
