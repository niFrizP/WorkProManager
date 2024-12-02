import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './services/autenticacion.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // Verificar token llamando al backend
    return this.authService.verifyToken().pipe(
      map((response) => {
        console.log('Token válido:', response);
        return true; // Permitir navegación si el token es válido
      }),
      catchError((error) => {
        console.error('Token no válido:', error);
        this.router.navigate(['/login']); // Redirigir al login si el token no es válido
        return of(false); // Bloquear navegación
      })
    );
  }
}
