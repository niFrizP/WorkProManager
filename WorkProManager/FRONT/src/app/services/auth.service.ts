import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';
import { Usuario } from '../interfaces/usuario';
import { CookieManagementService } from './cookie.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private isAuthenticated = false; // Cambia esto según el estado real de autenticación


  static getUserRole() {
    throw new Error('Method not implemented.');
  }
  private myAppUrl: string;
  private myApiUrl: string;
  public userId: number = 0;
  private userRole: number = 0;
  private rolId: number = 0;
  private userRoleSubject = new BehaviorSubject<number | null>(null);
  private userSubject = new BehaviorSubject<number | null>(null);
  userRole$ = this.userRoleSubject.asObservable(); // Observable que expone el rol del usuario
  private userName: string = ''; // Variable para almacenar el nombre del usuario
  private userNameSubject = new BehaviorSubject<string | null>(null); // Subject para notificar cambios en el nombre del usuario

  userName$ = this.userNameSubject.asObservable(); // Observable que expone el nombre del usuario

  // Metodo para obtener el nombre del usuario
  saveUserName(name: string): void {
    this.userName = name;
    this.userNameSubject.next(name); // Notifica el cambio de nombre
    if (typeof window !== 'undefined') {
      localStorage.setItem('userName', name); // Guarda el nombre en el localStorage
    }
  }

  // Metodo para obtener el nombre del usuario
  getUserName(): string {
    return this.userName;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieManagementService,

  ) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/login';
  }

  iniciarSesion(credentials: any) {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, credentials, { withCredentials: true }).pipe(
      tap((response) => {
        // Almacenar el nombre de usuario recibido desde el backend
        this.userName = response.nom_usu;
        this.saveUserData(response.rut_usuario, response.id_rol);
      })
    );
  }


  setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  isAuth(): boolean {
    if (this.verificarToken()) {
      return true;
    } else {
      return false;
    }
  }

  verificarToken(): Observable<{ rut_usuario: number; id_rol: number }> {
    const token = this.cookieService.getAccessToken();
    if (!token) {
      return of({ rut_usuario: 0, id_rol: 0 }).pipe(
        tap(() => {
          throw new Error('No hay token disponible');
        })
      );
    }

    return this.http.get<{ rut_usuario: number; id_rol: number }>(
      `${this.myAppUrl}${this.myApiUrl}/verify`,
      { withCredentials: true }
    ).pipe(
      tap((data: { rut_usuario: number; id_rol: number; }) => {
        this.userRole = data.id_rol; // Guarda el rol en el servicio
        this.userId = data.rut_usuario; // Guarda el rut_usuario en el servicio
      })
    );
  }

  getUserRole(): number {
    return this.userRole;
  }

  saveUserData(rut_usuario: number, id_rol: number): void {
    this.setUserId(rut_usuario);
    this.setRolId(id_rol);
    if (typeof window !== 'undefined') {
      localStorage.setItem('userRole', id_rol.toString());
      localStorage.setItem('userId', rut_usuario.toString());
    }
  }

  setUserId(rut_usuario: number): void {
    this.userId = rut_usuario;
    this.userSubject.next(rut_usuario); // Notifica el cambio de rol

    console.log('Usuario:', this.userId);

  }

  setRolId(id_rol: number): void {
    this.rolId = id_rol;
    this.userRoleSubject.next(id_rol); // Notifica el cambio de rol
    console.log('Rol:', this.rolId);
  }

  getUserId(): number | null {
    console.log('Usuario:', this.userId);
    return this.userId;
  }

  getUserIdObs(): Observable<number> {
    console.log('Usuario:', this.userId);
    return of(this.userId);
  }

  getRolIdLocal(): number | null {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('userRole');
      return role ? Number(role) : null;
    }
    return null;
  }

  public getIdLocal(): number | null {
    if (typeof window !== 'undefined') {
      const rut_usuario = localStorage.getItem('userId');
      return rut_usuario ? Number(rut_usuario) : null;
    }
    return null;
  }


  getRolId(): number | null {
    console.log('Rol:', this.rolId);
    return this.rolId;
  }


  clearUserData(): void {
    this.userId = 0;
    this.rolId = 0;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userRole');
    }
  }

  logout() {


    this.clearUserData();
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/logout`, null, { withCredentials: true });

  }



}



