import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Marca } from '../interfaces/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private apiUrl = environment.apiUrl; // Base URL de la API

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las marcas.
   * @returns {Observable<Marca[]>} Lista de marcas.
   */
  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(`${this.apiUrl}/api/marca`);
  }

  deleteMarca(id: number) {
    return this.http.delete(`${this.apiUrl}/marcas/${id}`);
  }
}
