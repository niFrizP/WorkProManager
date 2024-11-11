import { Component, OnInit } from '@angular/core';
import { newOrder } from '../../interfaces/newOrder';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieManagementService } from '../../services/cookie.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../services/auth_interceptor.service';

@Component({
  standalone: true,
  providers: [AuthService, CookieManagementService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading = true; // Estado de carga

  totalOrdersByYear: number = 0;  // Variable para el total
  ordersOfTheDay: number = 0;
  ordersByofEstadoSum: number = 0;
  errorMessage: string = '';
  ordersByEstado: newOrder[] = [];
  ordersByYear: newOrder[] = [];
  ordersByDay: newOrder[] = [];
  ordersByEstadoSum: newOrder[] = [];
  constructor(private authService:AuthService, private router:Router, private cookieService:CookieManagementService) {}

  ngOnInit(): void {

    const accessToken = this.cookieService.getAccessToken();
    console.log('Access Token:', accessToken);

    this.authService.verificarToken().subscribe({
      next: (data) => {
        // Guarda los datos de usuario
        this.authService.saveUserData(data.rut_usuario, data.id_rol); 
        console.log('Usuario verificado:', data);
        this.isLoading = false; // Cambia el estado de carga cuando termine
      },
      error: (err) => {
        console.error('Error al verificar el token:', err);
        this.isLoading = false; // Cambia el estado de carga cuando termine
      },
    });
      
    this.isLoading = false;

  }


  

   async logout() {
    try {
      await this.authService.logout().toPromise();
      this.router.navigate(['/login']).then(() => {
        window.location.reload();  // Recarga la página
      });
    } catch (error) {
      console.error(error);
    }

    this.router.navigate(['/login']);
  }
  





}