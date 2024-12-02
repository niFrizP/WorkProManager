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

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los trabajadores con rol de técnico.
   * @returns {Observable<Trabajador[]>} Lista de técnicos.
   */
  getTecnicos(): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(`${this.apiUrl}/api/trabajador/tecnico`);
  }

  /**
   * Crear un trabajador.
   * @param {Trabajador} trabajador Datos del trabajador a crear o actualizar.
   * @returns {Observable<Trabajador>} El trabajador creado.
   */
  createTrabajador(trabajadorData: Trabajador): Observable<Trabajador> {
    return this.http.post<Trabajador>(`${this.apiUrl}/api/trabajador`, trabajadorData);
  }

  /**
   * Actualizar un trabajador.
   * @param {Trabajador} trabajador Datos del trabajador a actualizar.
   * @returns {Observable<Trabajador>} El trabajador actualizado.
   */
  updateTrabajador(rut_trab: string, trabajadorData: Trabajador): Observable<Trabajador> {
    return this.http.put<Trabajador>(`${this.apiUrl}/api/trabajador/${rut_trab}`, trabajadorData);
  }
}
