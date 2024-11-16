import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.css'],
  imports: [CommonModule],
})
export class CronometroComponent implements OnInit, OnDestroy {
  @Input() fechaPlazo!: string | Date | null;
  
  tiempoRestante: string = '';
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    if (this.fechaPlazo) {
      this.iniciarCronometro();
    } else {
      this.tiempoRestante = 'Fecha no disponible';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private iniciarCronometro(): void {
    const fechaObjetivo = this.fechaPlazo instanceof Date
      ? this.fechaPlazo.getTime()
      : new Date(this.fechaPlazo as string).getTime();

    this.subscription = interval(1000).subscribe(() => {
      const tiempoActual = new Date().getTime();
      const diferencia = fechaObjetivo - tiempoActual;

      if (diferencia > 0) {
        this.tiempoRestante = this.calcularTiempoRestante(diferencia);
      } else {
        this.tiempoRestante = 'Tiempo cumplido';
        this.subscription.unsubscribe();
      }
    });
  }

  private calcularTiempoRestante(diferencia: number): string {
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    return `${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }
}
