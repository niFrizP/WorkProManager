import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Asegúrate de tener el apiUrl configurado

  constructor(private http: HttpClient) {}

  login(credentials: { rut_trab: string, clave: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/trabajador/login`, credentials, {
      withCredentials: true  // Asegura que las cookies se envíen con la solicitud
    });
  }

  // Método para verificar si el usuario está autenticado (puedes agregar más lógica si lo necesitas)
  isAuthenticated(): boolean {
    // En este caso, verificamos si la cookie 'token' existe. Puedes mejorar esto con lógica adicional.
    return document.cookie.includes('token=');  // Revisa si existe el token en las cookies
  }

  logout() {
    return this.http.post(`${this.apiUrl}/api/trabajador/logout`, {}, { withCredentials: true });
  }
}
