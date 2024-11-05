import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { tap } from 'rxjs/operators'; 
import { Usuario } from '../interfaces/usuario';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private myAppUrl: string;
  private myApiUrl: string;
  private MyApiUrlLogin: string;

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/usuario/';
    this.MyApiUrlLogin = 'api/login';}

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

  login(rut_usuario: number, password: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.myAppUrl}${this.MyApiUrlLogin}`, { rut_usuario, password }, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          if (response && response.message === 'Inicio de sesión exitoso') {
            console.log('Login exitoso:', response);
            // Aquí podrías realizar acciones adicionales, como redireccionar al usuario
          }
        })
      );}
}