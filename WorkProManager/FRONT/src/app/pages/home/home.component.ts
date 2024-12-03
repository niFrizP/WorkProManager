import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { OrdenTrabajoService } from '../../services/orden-trabajo.service';
import { OrdenTrabajo } from '../../interfaces/ordenTrabajo';
import { ListasOrdenTrabajo } from '../../interfaces/listaOT';
import { CronometroComponent } from '../../components/cronometro/cronometro.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CronometroComponent
    // Importa aquí otros componentes standalone que uses en tu template
  ]
})
export class HomeComponent implements OnInit {
  ordenesRecientes: ListasOrdenTrabajo[] = [];
  contadores = {
    cotizacion: 0,
    confirmando: 0,
    enProceso: 0,
    realizada: 0,
    rechazada: 0
  };

  constructor(private ordenTrabajoService: OrdenTrabajoService, private router: Router) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    // Cargar órdenes recientes
    this.ordenTrabajoService.cargarOrdenesDeTrabajo().subscribe(
      (ordenes) => {
        this.ordenesRecientes = ordenes.slice(0, 5); // Tomamos solo las 5 más recientes
        this.calcularContadores(ordenes);
      },
      (error) => {
        console.error('Error al cargar órdenes:', error);
      }
    );
  }

  calcularContadores(ordenes: ListasOrdenTrabajo[]) {
    this.contadores = ordenes.reduce((acc, orden) => {
      switch (orden.id_estado) {
        case 1: // Cotización y revisión
          acc.cotizacion++;
          break;
        case 2: // Confirmando cotización
          acc.confirmando++;
          break;
        case 3: // En proceso
          acc.enProceso++;
          break;
        case 4: // Realizada
          acc.realizada++;
          break;
        case 5: // Rechazada
          acc.rechazada++;
          break;
      }
      return acc;
    }, {
      cotizacion: 0,
      confirmando: 0,
      enProceso: 0,
      realizada: 0,
      rechazada: 0
    });
  }

  getEstadoClase(estadoId: number): string {
    const claseBase = 'px-2 py-1 text-sm rounded-full';
    const clases: { [key: number]: string } = {
      1: 'bg-blue-200 text-blue-800',    // Cotización y revisión
      2: 'bg-purple-200 text-purple-800', // Confirmando cotización
      3: 'bg-yellow-200 text-yellow-800', // En proceso
      4: 'bg-green-200 text-green-800',   // Realizada
      5: 'bg-red-200 text-red-800'        // Rechazada
    };
    return `${claseBase} ${clases[estadoId] || ''}`;
  }

  navegarAOrdenes() {
    this.router.navigate(['/ordenes']);
  }
}