// src/app/services/servicio-orden.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { vistaServicio } from '../interfaces/vistaServicio';
import { vistaServicioResponse } from '../interfaces/vistaServicio';
import { AuthService } from './autenticacion.service';

@Injectable({
  providedIn: 'root',
})
export class ServicioOrdenService {
  private apiUrl = 'http://localhost:3001/api/servicio-orden/crear-servicio-orden';  // Cambia esto con la URL de tu API
  private apiUrlget = 'http://localhost:3001/api/get-servicio-orden';  // Asegúrate de que la URL del backend sea correcta

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para insertar un nuevo servicio de orden
  insertarServicioOrden(data: vistaServicio): Observable<vistaServicio> {
    return this.http.post<vistaServicio>(this.apiUrl, data);
  }

  actualizarServicioOrden(id_ot: number, id_serv: number, datos: any): Observable<vistaServicio> {
    return this.http.put<vistaServicio>(`${this.apiUrl}/${id_ot}/${id_serv}`, datos, {withCredentials:true});
  }

  // Función para obtener los servicios de una orden
  getServiciosOrden(id_ot: number): Observable<any> {
    return this.http.get(`${this.apiUrlget}/${id_ot}`, {withCredentials:true});  // Concatenar el id_ot a la URL
  }

  desactivarServicioOrden(id_ot: number, id_serv: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.verifyToken()}`);
  
    return this.http.put(
      `${this.apiUrlget}/desc/${id_ot}/${id_serv}`,
      {}, // Cuerpo vacío
      { headers, withCredentials: true }
    );
  }

  activarServicioOrden(id_ot: number, id_serv: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.verifyToken()}`);
  
    return this.http.put(
      `${this.apiUrlget}/act/${id_ot}/${id_serv}`,
      {}, // Cuerpo vacío
      { headers, withCredentials: true }
    );
  }

  getServiciosHabilitados(id_ot: number): Observable<any> {
    return this.http.get(`${this.apiUrlget}/hab/${id_ot}`, {withCredentials:true});  // Concatenar el id_ot y el id_serv a la URL
  }

  getServiciosDeshabilitados(id_ot: number): Observable<any> {
    return this.http.get(`${this.apiUrlget}/des/${id_ot}`, {withCredentials:true});  // Concatenar el id_ot y el id_serv a la URL
  }

}
