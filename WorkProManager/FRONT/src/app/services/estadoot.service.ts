import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { EstadoOT } from '../interfaces/estadoot';
@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/estado_ot/'; // Cambiado a 'api/equipos/'
  }

  getListEstados(): Observable<EstadoOT[]> {
    return this.http.get<EstadoOT[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteEstado(id_estado_ot: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id_estado_ot}`); // Cambiado a 'num_equipo'
  }

  saveEstado(estado: EstadoOT): Observable<EstadoOT> {
    return this.http.post<EstadoOT>(`${this.myAppUrl}${this.myApiUrl}`, estado);
  }

  getEstado(id_estado_ot: number): Observable<EstadoOT> {
    return this.http.get<EstadoOT>(`${this.myAppUrl}${this.myApiUrl}${id_estado_ot}`); // Cambiado a 'num_equipo'
  }

  updateEstado(id_estado_ot: number, estado: EstadoOT): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id_estado_ot}`, estado);
  }
}
