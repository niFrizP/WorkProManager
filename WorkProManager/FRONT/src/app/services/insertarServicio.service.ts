// src/app/services/servicio-orden.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { vistaServicio } from '../interfaces/vistaServicio';


@Injectable({
  providedIn: 'root',
})
export class ServicioOrdenService {
  private apiUrl = 'http://localhost:3001/api/servicio-orden/crear-servicio-orden';  // Cambia esto con la URL de tu API

  constructor(private http: HttpClient) {}

  // Método para insertar un nuevo servicio de orden
  insertarServicioOrden(data: vistaServicio): Observable<vistaServicio> {
    return this.http.post<vistaServicio>(this.apiUrl, data);
  }


}
