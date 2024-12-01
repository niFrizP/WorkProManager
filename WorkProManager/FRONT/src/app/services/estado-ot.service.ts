// src/app/services/estado-ot.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadoOT } from '../interfaces/estadoot';

@Injectable({
  providedIn: 'root'
})
export class EstadoOTService {

  private apiUrl = 'http://localhost:3001/api/estado-ot';  // URL de la API que proporciona los estados OT

  constructor(private http: HttpClient) { }

  // Obtener todos los estados OT
  getEstadoOTs(): Observable<EstadoOT[]> {
    return this.http.get<EstadoOT[]>(this.apiUrl);
  }

  // Obtener un estado OT por su id
  getEstadoOTById(id: number): Observable<EstadoOT> {
    return this.http.get<EstadoOT>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo estado OT
  createEstadoOT(estadoOT: EstadoOT): Observable<EstadoOT> {
    return this.http.post<EstadoOT>(this.apiUrl, estadoOT);
  }

  // Actualizar un estado OT existente
  updateEstadoOT(id: number, estadoOT: EstadoOT): Observable<EstadoOT> {
    return this.http.put<EstadoOT>(`${this.apiUrl}/${id}`, estadoOT);
  }

  // Eliminar un estado OT
  deleteEstadoOT(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
