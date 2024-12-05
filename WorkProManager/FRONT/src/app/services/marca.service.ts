import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Marca } from '../interfaces/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getMarcas(): Observable<Marca[]> {
    return this.http.get<any>(`${this.apiUrl}/api/marca`, {
      headers: this.getHeaders()
    }).pipe(
      map(response => {
        console.log('Respuesta sin procesar:', response);
        return response.map((marca: any) => ({
          id_marca: marca.id_marca,
          nom_marca: marca.nom_marca
        }));
      })
    );
  }

  createMarca(marca: Marca): Observable<Marca> {
    return this.http.post<Marca>(`${this.apiUrl}/api/marca`, marca, {
      headers: this.getHeaders()
    });
  }

  deleteMarca(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/marca/${id}`, {
      headers: this.getHeaders()
    });
  }
}
