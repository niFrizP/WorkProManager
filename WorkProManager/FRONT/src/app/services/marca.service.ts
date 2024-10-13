import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 
import { Marca } from '../interfaces/marca'; 


@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/marca/'
  }

  getListMarcas(): Observable<Marca[]> {
   return this.http.get<Marca[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteMarcas(id_marca: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id_marca}`)
  }

  saveMarca(marca: Marca): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,marca)
  }

  getMarca(id_marca: number): Observable<Marca> {
    return this.http.get<Marca>(`${this.myAppUrl}${this.myApiUrl}${id_marca}`)
  }

  updateMarca(id_marca: number, marca: Marca): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id_marca}`, marca);
  }
}