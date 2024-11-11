import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthRolGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const requiredRoles = route.data['requiredRoles']; // Cambia a 'requiredRoles'
    return this.authService.verificarToken().pipe(
      map(data => {
        if (data && data.rut_usuario && requiredRoles.includes(data.id_rol)) { // Verifica si el rol está en la lista
          this.authService.saveUserData(data.rut_usuario, data.id_rol);
          return true;
        } else {
          this.router.navigate(['/unauthorized']); // Redirige si el rol no es el correcto
          return false;
        }
      }),
      catchError((error) => {
        this.router.navigate(['/login']); // Redirige a login si hay un error
        return of(false);
      })
    );
  }
}
