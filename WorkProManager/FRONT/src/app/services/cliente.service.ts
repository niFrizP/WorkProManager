import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment'; 
import { Cliente } from '../interfaces/cliente'; 


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/clientes/'
  }

  getListClientes(): Observable<Cliente[]> {
   return this.http.get<Cliente[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteClientes(rut_cliente: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${rut_cliente}`)
  }

  saveCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.myAppUrl}${this.myApiUrl}`, cliente).pipe(
      catchError((error: any) => {
        console.error('Error in saveCliente HTTP request:', error);
        return throwError(() => new Error('Error saving cliente'));
      })
    );
  }

  getCliente(rut_cliente: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.myAppUrl}${this.myApiUrl}${rut_cliente}`)
  }

  updateCliente(rut_cliente: number, cliente: Cliente): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${rut_cliente}`, cliente);
  }
}