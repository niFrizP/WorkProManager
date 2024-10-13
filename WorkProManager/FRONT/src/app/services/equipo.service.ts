import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 
import { Equipo } from '../interfaces/equipo'; 

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/equipo/'; // Cambiado a 'api/equipos/'
  }

  getListEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteEquipo(num_equipo: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${num_equipo}`); // Cambiado a 'num_equipo'
  }

  saveEquipo(equipo: Equipo): Observable<Equipo> {
    return this.http.post<Equipo>(`${this.myAppUrl}${this.myApiUrl}`, equipo);
  }

  getEquipo(num_equipo: number): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.myAppUrl}${this.myApiUrl}${num_equipo}`); // Cambiado a 'num_equipo'
  }

  updateEquipo(num_equipo: number, equipo: Equipo): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${num_equipo}`, equipo);
  }
}
