import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(credentials: { rut_trab: string, clave: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/trabajador/login`, credentials, {
      withCredentials: true
    }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('rut_trab', credentials.rut_trab);
        }
      })
    );
  }

  verifyToken(): Observable<any> {
    const token = localStorage.getItem('token');
    const rut = localStorage.getItem('rut_trab');
    
    console.log('=== Verificación de Token ===');
    console.log('Token en localStorage:', token);
    console.log('Rut en localStorage:', rut);
    console.log('URL de verificación:', `${this.apiUrl}/api/trabajador/verify-token`);

    // Si no hay token, retornamos un error inmediatamente
    if (!token) {
      console.error('No hay token disponible');
      return new Observable(subscriber => {
        subscriber.error('No token available');
      });
    }

    return this.http.get<any>(`${this.apiUrl}/api/trabajador/verify-token`, { 
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).pipe(
      tap({
        next: (response) => console.log('Respuesta exitosa de verify-token:', response),
        error: (error) => console.error('Error en verify-token:', error)
      }),
      map(response => {
        if (!response || !response.user) {
          throw new Error('Respuesta inválida del servidor');
        }
        return {
          userRole: response.user.id_rol,
          userRut: response.user.rut_trab
        };
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/trabajador/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('rut_trab');
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const isAuth = !!token;
    console.log('=== Verificación de Autenticación ===');
    console.log('Token existe:', isAuth);
    return isAuth;
  }
}
