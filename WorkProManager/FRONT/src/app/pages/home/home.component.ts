import { Component, OnInit } from '@angular/core';
import { newOrder } from '../../interfaces/newOrder';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


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
  constructor(private authService:AuthService, private router:Router) {}

  ngOnInit(): void {

    this.authService.verificarToken().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );

  }

   logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
  





}