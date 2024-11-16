import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QueryService } from '../../services/query';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-graficox-mes',
  template: `
    <div class="chart-container">
      <h2>Órdenes por Mes</h2>
      <canvas #chartCanvas></canvas>
      <div *ngIf="isLoading" class="loading">
        <p>Cargando datos...</p>
      </div>
      <div *ngIf="error" class="error">
        <p>{{ error }}</p>
      </div>
    </div>
  `,
  styles: [`
    .chart-container {
      width: 80%;
      margin: 0 auto;
      text-align: center;
    }
    .loading, .error {
      font-size: 1.2em;
      color: #555;
      margin-top: 20px;
    }
    .error {
      color: #ff0000;
    }
  `],
  imports: [CommonModule]
})
export class GraficoxMesComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  
  public chart: Chart | undefined;
  public isLoading: boolean = true;
  public error: string | null = null;

  constructor(private orderService: QueryService) {}

  ngOnInit(): void {
    this.loadOrdersData();
  }

  loadOrdersData(): void {
    this.orderService.getOrdersByEstadoEnTiempo().subscribe(
      (data) => {
        const labels = data.map((item: any) => item.monthYear);
        const values = data.map((item: any) => item.total);
        
        this.createChart(labels, values);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener datos:', error);
        this.error = 'Error al cargar los datos. Por favor, intente de nuevo más tarde.';
        this.isLoading = false;
      }
    );
  }

  createChart(labels: string[], values: number[]): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const config: ChartConfiguration = {
      type: 'bar' as ChartType,
      data: {
        labels: labels,
        datasets: [{
          label: 'Órdenes por Mes',
          data: values,
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Mes/Año'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Número de Órdenes'
            }
          }
        }
      }
    };

    this.chart = new Chart(this.chartCanvas.nativeElement, config);
  }
}