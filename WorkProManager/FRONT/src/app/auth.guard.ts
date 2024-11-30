// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/autenticacion.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return Promise.resolve(this.authService.isAuthenticated()).then((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    });
  }
}
