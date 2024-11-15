import { Component, OnInit } from '@angular/core';
import { newOrder } from '../../interfaces/newOrder';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieManagementService } from '../../services/cookie.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../services/auth_interceptor.service';
import { QueryService } from '../../services/query';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  standalone: true,
  providers: [AuthService, CookieManagementService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  imports: [FormsModule, CommonModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading = true; // Estado de carga
  showDashboard = false; // Controla si mostrar los dashboards
  startDate: string = '' 
  rut_usuario: number = 0;
  endDate: string = '';
  ordenesCount: number | null = null;
  ordenesActivas: number | null = null;
  ordenesEliminadas: number | null = null;
  totalOrdersByYear: number = 0;  // Variable para el total
  ordersOfTheDay: number = 0;
  ordersByofEstadoSum: number = 0;
  errorMessage: string = '';
  ordersByEstado: newOrder[] = [];
  ordersByYear: newOrder[] = [];
  ordersByDay: newOrder[] = [];
  ordersByEstadoSum: newOrder[] = [];

  ordersCount1: number = 0;
  ordersCount2: number = 0;
  ordersCount3: number = 0;
  ordersCount4: number = 0;
  ordersCount5: number = 0;

  countTotalActivas: number = 0;
  countTotal: number = 0;
  countEliminadas: number = 0;

  countbyUser: number = 0;


  ordenesCountByUsuario: number = 0;

  constructor(public authService:AuthService, private router:Router, private cookieService:CookieManagementService,private queryService:QueryService) {}

  ngOnInit(): void {
    setTimeout(() => {
       this.authService.getUserId()
      console.log(this.authService.getUserId())
    }, 2000);
    this.authService.getUserRole()
    this.ordenesCount = 0; // Establece un valor inicial si aún no has obtenido los datos
    this.ordenesCountByUsuario = 0; // Establece un valor inicial si aún no has obtenido los datos
  this.ordenesActivas = 0; 
this.ordenesEliminadas = 0;
this.countTotalActivas = 0;
this.countTotal = 0;
this.countEliminadas = 0;
this.countbyUser = 0;

this.ordersCount1 = 0;
this.ordersCount2 = 0;
this.ordersCount3 = 0;
this.ordersCount4 = 0;
this.ordersCount5 = 0;


this.showDashboard = false; // Controla si mostrar los dashboards

    const accessToken = this.cookieService.getAccessToken();
    console.log('Access Token:', accessToken);

    this.authService.verificarToken().subscribe({
      next: (data) => {
        // Guarda los datos de usuario
        this.authService.saveUserData(data.rut_usuario, data.id_rol); 
        console.log('Usuario verificado:', data);
        this.rut_usuario = data.rut_usuario;
        console.log('Valor de this.rutUsuario:', this.rut_usuario); // Imprime `this.rutUsuario` en la consola
        this.isLoading = false; // Cambia el estado de carga cuando termine
      },
      error: (err) => {
        console.error('Error al verificar el token:', err);
        this.isLoading = false; // Cambia el estado de carga cuando termine
      },
    });

    setTimeout(() => {this.getOrdersByEstado1(this.rut_usuario),   this.getOrdersByEstado2(this.rut_usuario),
      this.getOrdersByEstado3(this.rut_usuario),    this.getOrdersByEstado4(this.rut_usuario);



   }, 2002);



    this.obtenerOrdenesValidas();
    this.obtenerOrdenesValidasTotal();
    this.obtenerConteoOrdenesEliminadasGeneral() 

    this

    this.obtenerConteoOrdenesActivasByUser()
    this.obtenerConteoOrdenesEliminadasByUser()
    this.isLoading = false;
  }


  getOrdersByEstado1(rut_usuario: number): void {
    console.log(rut_usuario)
    this.queryService.getOrdersByEstadoByUser1(rut_usuario).subscribe(
      (data) => {
        this.ordersCount1 = data[0].total;
        console.log(this.ordersCount1);
      },
      (error) => {
        console.error('Error al obtener las órdenes:', error);
      }
    );
  }

  getOrdersByEstado2(rut_usuario: number): void {
    this.queryService.getOrdersByEstadoByUser2(rut_usuario).subscribe(
      (data) => {
        this.ordersCount2 = data[0].total;
      },
      (error) => {
        console.error('Error al obtener las órdenes:', error);
      }
    );
  }

  getOrdersByEstado3(rut_usuario: number): void {
    this.queryService.getOrdersByEstadoByUser3(rut_usuario).subscribe(
      (data) => {
        this.ordersCount3 = data[0].total;
      },
      (error) => {
        console.error('Error al obtener las órdenes:', error);
      }
    );
  }

  getOrdersByEstado4(rut_usuario: number): void {
    this.queryService.getOrdersByEstadoByUser4(rut_usuario).subscribe(
      (data) => {
        this.ordersCount4 = data[0].total;
      },
      (error) => {
        console.error('Error al obtener las órdenes:', error);
      }
    );
  }

  getOrdersByEstado5(rut_usuario: number): void {
    this.queryService.getOrdersByEstadoByUser5(rut_usuario).subscribe(
      (data) => {
        this.ordersCount5 = data[0].total;
      },
      (error) => {
        console.error('Error al obtener las órdenes:', error);
      }
    );
  }

  onFilterChange(filterType: string) {
    this.obtenerFechasPorFiltro(filterType);
  }
  
  obtenerFechasPorFiltro(filterType: string) {
    const currentDate = new Date();

    switch (filterType) {
      case 'day':
        // Si el filtro es por día, se usa la fecha actual
        this.startDate = currentDate.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
        this.endDate = this.startDate;
        break;

      case 'month':
        // Si el filtro es por mes, calculamos el primer y último día del mes
        this.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
          .toISOString()
          .split('T')[0]; // Primer día del mes en formato "YYYY-MM-DD"
        
        this.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
          .toISOString()
          .split('T')[0]; // Último día del mes en formato "YYYY-MM-DD"
        break;

      case 'year':
        // Si el filtro es por año, calculamos el primer y último día del año
        this.startDate = new Date(currentDate.getFullYear(), 0, 1)
          .toISOString()
          .split('T')[0]; // Primer día del año en formato "YYYY-MM-DD"
        
        this.endDate = new Date(currentDate.getFullYear(), 11, 31)
          .toISOString()
          .split('T')[0]; // Último día del año en formato "YYYY-MM-DD"
        break;

      default:
        console.error('Filtro desconocido');
        return;
    }

    // Llamamos a los métodos para obtener los datos con el nuevo rango de fechas
    this.obtenerOrdenesValidas();
    this.obtenerConteoOrdenesEliminadasGeneral();
    this.obtenerOrdenesValidasTotal();

  }


  obtenerOrdenesValidas() {
    this.queryService.getCountOrdenesEnTiempoAbierta(this.startDate, this.endDate).subscribe(
      (data) => {
        this.countTotalActivas = data[0].total; // Accede al primer objeto y la propiedad 'total'
        console.log('Total de órdenes:', this.countTotalActivas);
        console.log(this.showDashboard);
      },
      (error) => {
        console.error('Error al obtener el conteo de órdenes:', error);
      }
    );
  }
  
  obtenerConteoOrdenesEliminadasGeneral() {
    this.queryService.getCountOrdenesEliminadas(this.startDate, this.endDate).subscribe(
      (data) => {
        this.countEliminadas = data[0].total; // Accede al primer objeto y la propiedad 'total'
        console.log('Total de órdenes:', this.countEliminadas);
      },
      (error) => {
        console.error('Error al obtener el conteo de órdenes:', error);
      }
    );
  }

  obtenerOrdenesValidasTotal() {
    this.queryService.getCountOrdenesEnTiempoTotal(this.startDate, this.endDate).subscribe(
      (data) => {
        this.countTotal = data[0].total; // Accede al primer objeto y la propiedad 'total'
        console.log('Total de órdenes:', this.countTotal);
        console.log(this.showDashboard);
      },
      (error) => {
        console.error('Error al obtener el conteo de órdenes:', error);
      }
    );
  }

  obtenerConteoOrdenes() {
    this.queryService.getCountOrdenes(this.startDate, this.endDate).subscribe(
      (data) => {
        this.ordenesCount = data[0].total; // Accede al primer objeto y la propiedad 'total'
        console.log('Total de órdenes:', this.ordenesCount);
        this.showDashboard = true; // Muestra el dashboard después de obtener las órdenes
        console.log(this.showDashboard);
      },
      (error) => {
        console.error('Error al obtener el conteo de órdenes:', error);
      }
    );
  }

  obtenerConteoOrdenesTotalByUser() {
    console.log(this.rut_usuario)
    
    this.queryService.getCountOrdenesTotalByUser(this.startDate, this.endDate, this.rut_usuario).subscribe(
      (data) => {
        console.log(data);
        this.ordenesCountByUsuario = data[0].total; // Accede al primer objeto y la propiedad 'total'
        console.log('Total de órdenes:', this.ordenesCountByUsuario);
      },
      (error) => {
        console.error('Error al obtener el conteo de órdenes:', error);
      }
    );
  }
  

  obtenerConteoOrdenesActivasByUser() {
    this.queryService.getCountOrdenesByUser(this.startDate, this.endDate, this.rut_usuario).subscribe(
      (data) => {
        this.ordenesActivas = data[0].total; // Accede al primer objeto y la propiedad 'total'
        console.log('Total de órdenes:', this.ordenesActivas);
      },
      (error) => {
        console.error('Error al obtener el conteo de órdenes:', error);
      }
    );
  }

  obtenerConteoOrdenesEliminadasByUser() {

    

    this.queryService.getCountOrdenesEliminadasByUser(this.startDate, this.endDate, this.rut_usuario).subscribe(
      (data) => {
        this.countbyUser = data[0].total; // Accede al primer objeto y la propiedad 'total'
        console.log('Total de órdenes:', this.countbyUser);
      },
      (error) => {
        console.error('Error al obtener el conteo de órdenes:', error);
      }
    );
  }


  obtenerConteoOrdenesActivas() {
    this.queryService.getCountOrdenesActivas(this.startDate, this.endDate).subscribe(
      (data) => {
        this.ordenesActivas = data[0].total; // Accede al primer objeto y la propiedad 'total'
        console.log('Total de órdenes:', this.ordenesActivas);
      },
      (error) => {
        console.error('Error al obtener el conteo de órdenes:', error);
      }
    );
  }


  obtenerConteoOrdenesEliminadas() {
    this.queryService.getCountOrdenesEliminadas(this.startDate, this.endDate).subscribe(
      (data) => {
        this.ordenesEliminadas = data[0].total; // Accede al primer objeto y la propiedad 'total'
        console.log('Total de órdenes:', this.ordenesEliminadas);
      },
      (error) => {
        console.error('Error al obtener el conteo de órdenes:', error);
      }
    );
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
  
  generarPDF(){
    this.pdfGeneratorService.generatePDF('pdf-content', 'ordenes_de_trabajo.pdf');
  }





}