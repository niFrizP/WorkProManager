import { Component, OnInit } from '@angular/core';
import { newOrder } from '../../interfaces/newOrder';
import { AuthService } from '../../services/auth.service';

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
  constructor(private authService:AuthService) {}

  ngOnInit(): void {}

  onLogin(formData: any) {
    this.authService.login(formData).subscribe(response => {
       console.log('Inicio de sesión exitoso', response);
    }, error => {
       console.error('Error en el inicio de sesión', error);
    });
 }





}