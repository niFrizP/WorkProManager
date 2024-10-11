import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 
import { Servicio } from '../interfaces/servicio';


@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/servicio/'
  }

  getListServicios(): Observable<Servicio[]> {
   return this.http.get<Servicio[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteServicios(id_serv: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id_serv}`)
  }

  saveServicio(servicio: Servicio): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,servicio)
  }

  getServicio(id_serv: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.myAppUrl}${this.myApiUrl}${id_serv}`)
  }

  updateOrder(id_serv: number, servicio: Servicio): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id_serv}`, servicio);
  }
}