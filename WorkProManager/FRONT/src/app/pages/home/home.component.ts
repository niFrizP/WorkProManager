import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { newOrder } from '../../interfaces/newOrder';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import  {NgChartsModule}  from 'ng2-charts';

@Component({
  standalone: true,
  providers: [FormsModule, CommonModule, NgChartsModule],
  imports: [FormsModule, CommonModule, NgChartsModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
/*   isLoading = true;
  showDashboard = false;
  startDate: string = '';
  endDate: string = '';
  rut_usuario: number = 0;

  // Variables para conteos
  ordenesCount: number | null = null;
  ordenesActivas: number | null = null;
  ordenesEliminadas: number | null = null;
  totalOrdersByYear: number = 0;
  ordersOfTheDay: number = 0;
  ordersCounttecnico: number = 0;
  countTotalActivas: number = 0;
  countTotal: number = 0;
  countEliminadas: number = 0;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataset<'bar'>[] = [
    { data: [], label: 'Órdenes Activas' },
    { data: [], label: 'Órdenes Completadas' }
  ]; */

  constructor(

    private router: Router, 

    private http: HttpClient
  ) {}

  ngOnInit(): void {

  }
}

 /*  inicializarComponentes(): void {
    this.rut_usuario = this.authService.getUserId() ?? 0;
    this.resetearContadores();
    this.obtenerOrdenesIniciales();
    this.isLoading = false;
  }

  verificarTokenUsuario(): void {
    const accessToken = this.cookieService.getAccessToken();
    console.log('Access Token:', accessToken);

    this.authService.verificarToken().subscribe({
      next: (data) => {
        this.authService.saveUserData(data.rut_usuario, data.id_rol);
        this.rut_usuario = data.rut_usuario;
        console.log('Usuario verificado:', data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al verificar el token:', err);
        this.isLoading = false;
      },
    });
  }

  resetearContadores(): void {
    this.ordenesCount = 0;
    this.ordenesActivas = 0;
    this.ordenesEliminadas = 0;
    this.countTotalActivas = 0;
    this.countTotal = 0;
    this.countEliminadas = 0;
  }

  obtenerOrdenesIniciales(): void {
    this.getOrdersCount();
    this.getOrdersCountCerradas();
    this.getOrdersCountPorRealizarTecnico();
  }

  getOrdersCount(): void {
    this.orderService.getOrdersCountPorRealizar().subscribe(
      response => this.ordenesCount = response.totalOrders,
      error => console.error('Error al obtener el conteo de órdenes', error)
    );
  }

  getOrdersCountCerradas(): void {
    this.orderService.getOrdersCountCerradas().subscribe(
      response => this.ordenesEliminadas = response.totalOrders,
      error => console.error('Error al obtener el conteo de órdenes cerradas', error)
    );
  }

  getOrdersCountPorRealizarTecnico(): void {
    const rut_usuario = this.authService.getIdLocal();
    this.orderService.getOrdersCountPorRealizarTecnico(rut_usuario ?? 0).subscribe(
      response => this.ordersOfTheDay = response.totalOrders,
      error => console.error('Error al obtener el conteo de órdenes por realizar para técnico', error)
    );
  }

  onFilterChange(filterType: string): void {
    this.obtenerFechasPorFiltro(filterType);
  }

  obtenerFechasPorFiltro(filterType: string): void {
    const currentDate = new Date();

    switch (filterType) {
      case 'day':
        this.startDate = this.formatearFecha(currentDate);
        this.endDate = this.startDate;
        break;
      case 'month':
        this.startDate = this.formatearFecha(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
        this.endDate = this.formatearFecha(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0));
        break;
      case 'year':
        this.startDate = this.formatearFecha(new Date(currentDate.getFullYear(), 0, 1));
        this.endDate = this.formatearFecha(new Date(currentDate.getFullYear(), 11, 31));
        break;
      default:
        console.error('Filtro desconocido');
        return;
    }

    this.obtenerOrdenesValidas();
    this.obtenerConteoOrdenesEliminadasGeneral();
    this.obtenerOrdenesValidasTotal();
  }

  formatearFecha(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  obtenerOrdenesValidas(): void {
    this.queryService.getCountOrdenesEnTiempoAbierta(this.startDate, this.endDate).subscribe(
      data => this.countTotalActivas = data[0].total,
      error => console.error('Error al obtener el conteo de órdenes activas:', error)
    );
  }

  obtenerConteoOrdenesEliminadasGeneral(): void {
    this.queryService.getCountOrdenesEliminadas(this.startDate, this.endDate).subscribe(
      data => this.countEliminadas = data[0].total,
      error => console.error('Error al obtener el conteo de órdenes eliminadas:', error)
    );
  }

  obtenerOrdenesValidasTotal(): void {
    this.queryService.getCountOrdenesEnTiempoTotal(this.startDate, this.endDate).subscribe(
      data => this.countTotal = data[0].total,
      error => console.error('Error al obtener el conteo total de órdenes:', error)
    );
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout().toPromise();
      this.router.navigate(['/login']).then(() => {
        localStorage.clear(); // Limpieza de localStorage
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  loadChartData(): void {
    const activeOrdersPromise = this.orderService.getOrdersCountPorRealizar().toPromise();
    const closedOrdersPromise = this.orderService.getOrdersCountCerradas().toPromise();
  
    Promise.all([activeOrdersPromise, closedOrdersPromise])
      .then(([activeOrdersResponse, closedOrdersResponse]) => {
        const activeOrders = activeOrdersResponse.totalOrders || 0;
        const closedOrders = closedOrdersResponse.totalOrders || 0;
  
        // Asignar datos al gráfico
        this.barChartData = [
          { data: [activeOrders], label: 'Órdenes Activas' },
          { data: [closedOrders], label: 'Órdenes Cerradas' },
        ];
      })
      .catch(error => {
        console.error('Error al cargar datos para el gráfico', error);
      });
  }
} */