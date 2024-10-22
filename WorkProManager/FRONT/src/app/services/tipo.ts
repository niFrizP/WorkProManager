import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 
import { Tipo } from '../interfaces/tipo';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/tipo/'
  }

  getListTipos(): Observable<Tipo[]> {
   return this.http.get<Tipo[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteTipos(id_tipo: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id_tipo}`)
  }

  saveTipo(tipo: Tipo): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,tipo)
  }

  getTipo(id_tipo: number): Observable<Tipo> {
    return this.http.get<Tipo>(`${this.myAppUrl}${this.myApiUrl}${id_tipo}`)
  }

  updateTipo(id_tipo: number, tipo: Tipo): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id_tipo}`, tipo);
  }
}