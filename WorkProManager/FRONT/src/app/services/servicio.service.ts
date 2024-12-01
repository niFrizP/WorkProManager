import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Servicio } from '../interfaces/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private apiUrl = environment.apiUrl; // Base URL de la API

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los trabajadores con rol de técnico.
   * @returns {Observable<Trabajador[]>} Lista de técnicos.
   */
  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/api/servicio`);
  }
}
