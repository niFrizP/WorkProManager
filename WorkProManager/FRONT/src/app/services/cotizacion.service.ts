import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { vistaOrden } from '../interfaces/vistaOrden';




@Injectable({
  providedIn: 'root'  // Esto asegura que el servicio sea globalmente accesible
})
export class CotizacionService {

  private apiUrl = 'http://localhost:3001/api/cotizacion/crear-orden-trabajo';  // URL de tu backend

  constructor(private http: HttpClient) {}

  insertarCotizacion(data: vistaOrden): Observable<vistaOrden> {
    return this.http.post<vistaOrden>(this.apiUrl, data);
  }
}
