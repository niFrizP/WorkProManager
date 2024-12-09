import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Trabajador } from '../interfaces/trabajador';
import { postTrabajador } from '../../../../BACK/src/controllers/trabajador';
import { getTrabajadorRol } from '../../../../BACK/src/controllers/trabajador_rol';


@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {
  private apiUrl = environment.apiUrl; // Asegúrate que esta sea la URL correcta

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Obtiene todos los trabajadores con rol de técnico.
   * @returns {Observable<Trabajador[]>} Lista de técnicos.
   */
  getTecnicos(): Observable<Trabajador[]> {
    return this.http.get<any>(`${this.apiUrl}/api/trabajador`, {
      headers: this.getHeaders()
    }).pipe(
      map(response => {
        console.log('Respuesta sin procesar:', response);
        return response.map((trabajador: any) => ({
          rut_trab: trabajador.rut_trab,
          nom_trab: trabajador.nom_trab,
          ape_trab: trabajador.ape_trab,
          id_rol: trabajador.id_rol,
          activo: trabajador.activo,
          d_veri_trab: trabajador.d_veri_trab
        }));
      })
    );
  }


  getTrabajador(rut_trab: string): Observable<Trabajador> {
    return this.http.get<Trabajador>(`${this.apiUrl}/api/trabajador/${rut_trab}`);
  }
  
  getTrabajadorRol(id_rol: number): Observable<Trabajador> {
    return this.http.get<Trabajador>(`${this.apiUrl}/api/trabajador_rol/${id_rol}`);
  }

  /**
   * Crear un trabajador.
   * @param {Trabajador} trabajador Datos del trabajador a crear o actualizar.
   * @returns {Observable<Trabajador>} El trabajador creado.
   */
  postTrabajador(trabajadorData: Trabajador): Observable<Trabajador> {
    return this.http.post<Trabajador>(`${this.apiUrl}/api/trabajador`, trabajadorData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Eliminar un Trabajador.
   * @param {string} rut_trab Rut del trabajador a eliminar.
   * @returns {Observable<any>} Respuesta de la eliminación.
   */
  deleteTrabajador(rut_trab: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/trabajador/${rut_trab}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Actualizar un trabajador.
   * @param {Trabajador} trabajador Datos del trabajador a actualizar.
   * @returns {Observable<Trabajador>} El trabajador actualizado.
   */
  updateTrabajador(rut_trab: string, trabajadorData: Trabajador): Observable<Trabajador> {
    return this.http.put<Trabajador>(`${this.apiUrl}/api/trabajador/${rut_trab}`, trabajadorData);
  }

  updatePassword(rut_trab: string, d_veri_trab: string, newPassword: string): Observable<Trabajador> {
    const url = `${this.apiUrl}/api/reset-password/${rut_trab}-${d_veri_trab}`;  // Incluye el dígito verificador en la URL
    return this.http.put<Trabajador>(url, { password: newPassword });
  }
}
