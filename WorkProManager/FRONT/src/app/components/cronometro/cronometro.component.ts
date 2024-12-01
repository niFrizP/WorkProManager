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
      this.tiempoRestante = 'Sin fecha de plazo definida';
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
        this.tiempoRestante = 'Plazo expirado';
        this.subscription.unsubscribe();
      }
    });
  }

  private calcularTiempoRestante(diferencia: number): string {
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

    // Lógica para mostrar solo días, días y horas, o horas y minutos
    if (dias > 1) {
      return `${dias} días restantes`;
    } else if (dias === 1) {
      return `${dias} día y ${horas} horas restantes`;
    } else if (horas > 0) {
      return `${horas} horas y ${minutos} minutos restantes`;
    } else {
      return `${minutos} minutos restantes`;
    }
  }
}
