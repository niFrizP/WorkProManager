import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
  ) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/login';
  }

  iniciarSesion(credentials: any) {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, credentials, { withCredentials: true });
}

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para verificar el token en el cliente
  verificarToken() {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/verify`);
}

  logout() {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/logout`, null, { withCredentials: true });
  }



}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api'; // Usar el prefijo /api

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(`${this.apiUrl}/data`);
  }
}
