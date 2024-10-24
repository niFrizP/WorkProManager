import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 
import { Usuario } from '../interfaces/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioEliminadoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/usuarioEliminado/'
  }

  getListUsuarios(): Observable<Usuario[]> {
   return this.http.get<Usuario[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteUsuarios(rut_usuario: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${rut_usuario}`)
  }

  saveUsuario(usuario:Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.myAppUrl}${this.myApiUrl}`,usuario)
  }

  getUsuario(rut_usuario: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.myAppUrl}${this.myApiUrl}${rut_usuario}`)
  }

  updateUsuario(rut_usuario: number, usuario: Usuario): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${rut_usuario}`, usuario);
  }
}