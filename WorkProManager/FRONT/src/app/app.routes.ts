import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { orden_trabajosComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },    // Ruta a 'home'
  { path: 'orders', component: orden_trabajosComponent },  // Ruta a 'orders'
  { path: 'profile', component: ProfileComponent }, // Ruta a 'profile'
  { path: '', redirectTo: 'home', pathMatch: 'full' },  // Redirige a 'home' al inicio
  { path: '**', redirectTo: 'home' } // Ruta wildcard para capturar URLs inválidas
];
