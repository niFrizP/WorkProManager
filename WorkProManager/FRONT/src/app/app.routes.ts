import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },    // Ruta a 'home'
  { path: 'sidebar', component: SidebarComponent },  // Ruta a 'sidebar'
  { path: 'orders', component: OrdersComponent },  // Ruta a 'orders'
  { path: 'profile', component: ProfileComponent }, // Ruta a 'profile'
  { path: '', redirectTo: 'home', pathMatch: 'full' },  // Redirige a 'home' al inicio
  { path: '**', redirectTo: 'home' } // Ruta wildcard para capturar URLs inválidas
];
