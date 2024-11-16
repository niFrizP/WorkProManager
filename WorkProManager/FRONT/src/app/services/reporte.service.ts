import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 
import { Reporte } from '../interfaces/reporte'; 

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint; // Endpoint base desde el archivo de configuración
    this.myApiUrl = 'api/reporte/'; // Ruta específica para el API de reportes
  }

  // Obtener la lista de reportes
  getListReportes(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  // Eliminar un reporte por ID
  deleteReporte(idreporte: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${idreporte}`);
  }

  // Guardar un nuevo reporte
  saveReporte(reporte: Reporte): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, reporte);
  }

  // Obtener un reporte por ID
  getReporte(idreporte: number): Observable<Reporte> {
    return this.http.get<Reporte>(`${this.myAppUrl}${this.myApiUrl}${idreporte}`);
  }

  // Actualizar un reporte por ID
  updateReporte(idreporte: number, reporte: Reporte): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${idreporte}`, reporte);
  }

  createReporte(reporte: any): Observable<any> {
    return this.http.post(this.myApiUrl, reporte);
  }
}
