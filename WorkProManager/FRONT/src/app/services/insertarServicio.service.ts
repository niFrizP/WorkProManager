// src/app/services/servicio-orden.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { vistaServicio } from '../interfaces/vistaServicio';
import { vistaServicioResponse } from '../interfaces/vistaServicio';


@Injectable({
  providedIn: 'root',
})
export class ServicioOrdenService {
  private apiUrl = 'http://localhost:3001/api/servicio-orden/crear-servicio-orden';  // Cambia esto con la URL de tu API
  private apiUrlget = 'http://localhost:3001/api/get-servicio-orden';  // Asegúrate de que la URL del backend sea correcta


  constructor(private http: HttpClient) {}

  // Método para insertar un nuevo servicio de orden
  insertarServicioOrden(data: vistaServicio): Observable<vistaServicio> {
    return this.http.post<vistaServicio>(this.apiUrl, data);
  }

  // Función para obtener los servicios de una orden
  getServiciosOrden(id_ot: number): Observable<any> {
    return this.http.get(`${this.apiUrlget}/${id_ot}`, {withCredentials:true});  // Concatenar el id_ot a la URL
  }



  // Método para eliminar un servicio de la orden
  eliminarServicioOrden(id_ot: number, id_serv: number): Observable<any> {
    return this.http.delete(`${this.apiUrlget}/${id_ot}/${id_serv}`, {withCredentials:true});  // Concatenar el id_ot y el id_serv a la URL
  }

}
