// src/app/services/timer.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private fechaPlazo: Date | undefined;
  private tiempoRestante$: BehaviorSubject<string>;

  constructor() {
    this.tiempoRestante$ = new BehaviorSubject<string>('');
  }

  // Establecer la fecha de plazo
  setFechaPlazo(fechaPlazo: string): void {
    this.fechaPlazo = new Date(fechaPlazo);
    this.startTimer();
  }

  // Iniciar el cronómetro
  private startTimer(): void {
    setInterval(() => {
      const tiempoRestante = this.calcularTiempoRestante(this.fechaPlazo as Date);
      this.tiempoRestante$.next(tiempoRestante);
    }, 1000);
  }

  // Calcular el tiempo restante
  private calcularTiempoRestante(fechaPlazo: Date): string {
    const ahora: Date = new Date();
    const tiempoRestante: number = fechaPlazo.getTime() - ahora.getTime();

    if (tiempoRestante <= 0) return '¡Plazo cumplido!';

    const dias: number = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
    const horas: number = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos: number = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
    const segundos: number = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

    return `${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }

  // Obtener el valor observable del tiempo restante
  getTiempoRestante() {
    return this.tiempoRestante$.asObservable();
  }
}
