import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { CanActivate } from '@angular/router';
import { CotizacionComponent } from './pages/cotizacion/cotizacion.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige a 'home' al inicio
  { path: 'login', component: LoginComponent }, // Ruta a 'login'
  { path: 'home', component: HomeComponent},
  { path: 'cotizacion', component: CotizacionComponent },
  { path: '**', redirectTo: '/login' }, // Maneja rutas no encontradas

];


export class AppRoutingModule { }

