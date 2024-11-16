import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from './services/cliente.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrdersModule } from './pages/orders/orders.module'; // manten si es necesario
import { SubmenuComponent } from './components/submenu-component/submenu-component.component';
import { ModalComponent } from './components/modal/modal.component';
import { AuthService } from './services/auth.service';
import { GraficoxMesComponent } from './components/graficox-mes/graficox-mes.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';


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
    ModalComponent,
    NgxPaginationModule,
    CommonModule,
    GraficoxMesComponent,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;
  title = 'WorkProManager';

  constructor(public authService:AuthService) {

   
}

  ngOnInit(): void {
    console.log('App Component Initialized');
    this.authService.isAuth();
    console.log(this.authService.isAuth())
    console.log(this.auth())
    this.isAuthenticated = this.authService.isAuth();

  }
auth(){
  this.authService.isAuth();
  console.log(this.authService.isAuth())
}


}





