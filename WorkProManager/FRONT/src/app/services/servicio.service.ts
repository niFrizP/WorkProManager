import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Servicio } from '../interfaces/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/api/servicio`, {
      headers: this.getHeaders()
    });
  }

  createServicio(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(`${this.apiUrl}/api/servicio`, servicio, {
      headers: this.getHeaders()
    });
  }

  deleteServicio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/servicio/${id}`, {
      headers: this.getHeaders()
    });
  }
}
