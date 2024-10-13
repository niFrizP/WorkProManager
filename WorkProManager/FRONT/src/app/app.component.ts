import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClienteService } from './services/cliente.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrdersModule } from './pages/orders/orders.module';
<<<<<<< HEAD
import { ModuleWithProviders } from '@angular/core';
=======
import { HttpClientModule } from '@angular/common/http';
>>>>>>> 57596914302ab3001954b2b793ae248ca76c1d8c

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [
    RouterOutlet,
    CommonModule,
    SidebarComponent,
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    BrowserAnimationsModule,
    ],
=======
  imports: [RouterOutlet, CommonModule, OrdersModule, SidebarComponent, NgxPaginationModule ,ReactiveFormsModule, FormsModule, HttpClientModule, ToastrModule, BrowserAnimationsModule, HeaderComponent],
  providers: [ClienteService],
>>>>>>> 57596914302ab3001954b2b793ae248ca76c1d8c
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'WorkProManager';
}
