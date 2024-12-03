import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CronometroComponent } from '../../components/cronometro/cronometro.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    CronometroComponent
  ]
})
export class HomeComponent implements OnInit {
  cotizacionCount: number = 0;
  confirmandoCount: number = 0;
  enProcesoCount: number = 0;
  realizadaCount: number = 0;
  rechazadaCount: number = 0;
  pendingOrders: number = 0;
  inProgressOrders: number = 0;
  completedOrders: number = 0;
  totalOrders: number = 0;
  recentOrders: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadMockData();
  }

  navegarAOrdenes() {
    this.router.navigate(['/ordenes']);
  }

  loadMockData() {
    // Datos simulados para las tarjetas
    this.cotizacionCount = 15;
    this.confirmandoCount = 8;
    this.enProcesoCount = 12;
    this.realizadaCount = 25;
    this.rechazadaCount = 5;

    // Datos simulados para la tabla de órdenes recientes
    this.recentOrders = [
      {
        id_ot: 'OT-001',
        rut_cliente: '12.345.678-9',
        VistaSolicitud: {
          nom_estado_ot: 'Cotización y revisión',
          fecha_plazo: new Date('2024-04-10T14:00:00')
        }
      },
      {
        id_ot: 'OT-002',
        rut_cliente: '98.765.432-1',
        VistaSolicitud: {
          nom_estado_ot: 'Confirmando cotización',
          fecha_plazo: new Date('2024-04-08T16:30:00')
        }
      },
      {
        id_ot: 'OT-003',
        rut_cliente: '11.222.333-4',
        VistaSolicitud: {
          nom_estado_ot: 'Servicios en proceso',
          fecha_plazo: new Date('2024-04-07T09:00:00')
        }
      },
      {
        id_ot: 'OT-004',
        rut_cliente: '44.555.666-7',
        VistaSolicitud: {
          nom_estado_ot: 'Orden Realizada',
          fecha_plazo: new Date('2024-04-06T11:15:00')
        }
      },
      {
        id_ot: 'OT-005',
        rut_cliente: '77.888.999-0',
        VistaSolicitud: {
          nom_estado_ot: 'Orden Rechazada',
          fecha_plazo: new Date('2024-04-09T13:45:00')
        }
      }
    ];
  }
}