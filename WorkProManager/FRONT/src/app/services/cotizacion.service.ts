import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Esto asegura que el servicio sea globalmente accesible
})
export class CotizacionService {
  private apiUrl = 'http://localhost:3000/orden-trabajo';  // URL de tu backend

  constructor(private http: HttpClient) {}

  insertarCotizacion(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
