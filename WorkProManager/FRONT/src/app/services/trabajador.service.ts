import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Trabajador } from '../interfaces/trabajador';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {
  private apiUrl = environment.apiUrl; // Base URL de la API

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los trabajadores con rol de técnico.
   * @returns {Observable<Trabajador[]>} Lista de técnicos.
   */
  getTecnicos(): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(`${this.apiUrl}/api/trabajador/tecnico`);
  }
}
