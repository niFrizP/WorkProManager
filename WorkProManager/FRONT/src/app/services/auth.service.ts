import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { CookieManagementService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = `${environment.endpoint}api/login`;
  public myApiUrl: string;
  private userId: number = 0;
  private userRole: number = 0;
  private rolId: number = 0;
  private userName: string = '';

  private userRoleSubject = new BehaviorSubject<number | null>(null);
  private userSubject = new BehaviorSubject<number | null>(null);
  private userNameSubject = new BehaviorSubject<string | null>(null);

  userRole$ = this.userRoleSubject.asObservable();
  userName$ = this.userNameSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieManagementService
  ) {
    this.apiUrl = environment.endpoint;
    this.myApiUrl = 'api/login';
  }

  iniciarSesion(rut_trab: string, clave: string): Observable<any> {
    const body = { rut_trab, clave };
    return this.http.post<any>(this.apiUrl, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true  // Si estás manejando cookies, asegúrate de esto
    });
  }

  private saveUserName(name: string): void {
    this.userName = name;
    this.userNameSubject.next(name);
    if (typeof window !== 'undefined') {
      localStorage.setItem('userName', name);
    }
  }

  getUserName(): string {
    return this.userName;
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  isAuth(): boolean {
    return this.verificarToken() ? true : false;
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

    return this.http.get<{ rut_usuario: number; id_rol: number }>(`${this.apiUrl}${this.myApiUrl}/verify`, { withCredentials: true })
      .pipe(
        tap(data => {
          this.userRole = data.id_rol;
          this.userId = data.rut_usuario;
        }),
        catchError(this.handleError('verificarToken', { rut_usuario: 0, id_rol: 0 }))
      );
  }

  getUserRole(): number {
    return this.userRole;
  }

  public saveUserData(rut_usuario: number, id_rol: number): void {
    this.setUserId(rut_usuario);
    this.setRolId(id_rol);
    if (typeof window !== 'undefined') {
      localStorage.setItem('userRole', id_rol.toString());
      localStorage.setItem('userId', rut_usuario.toString());
    }
  }

  private setUserId(rut_usuario: number): void {
    this.userId = rut_usuario;
    this.userSubject.next(rut_usuario);
  }

  private setRolId(id_rol: number): void {
    this.rolId = id_rol;
    this.userRoleSubject.next(id_rol);
  }

  getUserId(): number | null {
    return this.userId || null;
  }

  getUserIdObs(): Observable<number> {
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
    return this.rolId || null;
  }

  private clearUserData(): void {
    this.userId = 0;
    this.rolId = 0;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
    }
  }

  logout(): Observable<any> {
    this.clearUserData();
    return this.http.post(`${this.apiUrl}${this.myApiUrl}/logout`, null, { withCredentials: true });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
