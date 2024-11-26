import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 
import { Adjudicacion } from '../interfaces/adjudicacion';
@Injectable({
  providedIn: 'root'
})
export class AdjudicacionService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/adjudicacion/'
  }

  getListAdjudicaciones(): Observable<Adjudicacion[]> {
   return this.http.get<Adjudicacion[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteAdjudicaciones(id_adjudicacion: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id_adjudicacion}`)
  }

  saveAdjudicaciones(adjudicacion: Adjudicacion): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,adjudicacion)
  }

  getAdjudicaciones(id_adjudicacion: number): Observable<Adjudicacion> {
    return this.http.get<Adjudicacion>(`${this.myAppUrl}${this.myApiUrl}${id_adjudicacion}`)
  }

  updateAdjudicacion(id_adjudicacion: number, adjudicacion: Adjudicacion): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id_adjudicacion}`, adjudicacion);
  }
}