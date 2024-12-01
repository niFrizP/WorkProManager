// src/app/services/orden-trabajo.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdenTrabajo } from '../interfaces/ordenTrabajo'; 

@Injectable({
  providedIn: 'root'
})
export class OrdenTrabajoService {

  private apiUrl = 'http://localhost:3001/api/orden-trabajo';  // URL de la API para obtener las ordenes de trabajo

  constructor(private http: HttpClient) { }

  // Obtener una orden de trabajo por su id
  getOrdenTrabajoById(id: number): Observable<OrdenTrabajo> {
    return this.http.get<OrdenTrabajo>(`${this.apiUrl}/${id}`);
  }
}
