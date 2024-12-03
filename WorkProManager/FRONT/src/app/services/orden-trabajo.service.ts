// src/app/services/orden-trabajo.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListasOrdenTrabajo } from '../interfaces/listaOT'; 

@Injectable({
  providedIn: 'root'
})
export class OrdenTrabajoService {

  private apiUrl = 'http://localhost:3001/api/orden';  // URL de la API para obtener las ordenes de trabajo

  constructor(private http: HttpClient) { }

  // Obtener todas las órdenes de trabajo
  getAllOrdenesTrabajo(): Observable<OrdenTrabajo[]> {
    return this.http.get<OrdenTrabajo[]>(this.apiUrl);
  }

  // Obtener una orden de trabajo por su id
  getOrdenById(id: number): Observable<ListasOrdenTrabajo> {
    return this.http.get<ListasOrdenTrabajo>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  cargarOrdenesDeTrabajo(): Observable<ListasOrdenTrabajo[]> {
    return this.http.get<ListasOrdenTrabajo[]>(this.apiUrl, { withCredentials: true });
  }

  
  
}
