import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { orden_trabajosComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NewOtComponent } from './pages/new-ot/new-ot.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Redirige a 'home' al inicio
  { path: 'home', component: HomeComponent }, // Ruta a 'home'
  { path: 'sidebar', component: SidebarComponent }, // Ruta a 'sidebar'
  { path: 'orders', component: OrdersComponent }, // Ruta a 'orders'
  { path: 'new-ot', component: NewOtComponent }, // Ruta a 'new-ot'
  { path: 'profile', component: ProfileComponent }, // Ruta a 'profile'
];
