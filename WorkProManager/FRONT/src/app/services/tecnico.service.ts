import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  obtenerTecnicos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerTecnicoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  obtenerTecnicoPorRut(rut: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/rut/${rut}`);
  }

  crearTecnico(tecnico: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, tecnico);
  }

  actualizarTecnico(id: number, tecnico: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, tecnico);
  }

  eliminarTecnico(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
} 