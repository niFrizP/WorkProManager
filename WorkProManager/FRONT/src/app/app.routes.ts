import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { NewOtComponent } from './pages/orders/new-ot/new-ot.component';
import { LoginComponent } from './pages/login/login.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { EditPfComponent } from './pages/profile/edit-pf/edit-pf.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige a 'home' al inicio
  { path: 'login', component: LoginComponent }, // Ruta a 'login'
  { path: 'home', component: HomeComponent }, // Ruta a 'home'
  { path: 'sidebar', component: SidebarComponent }, // Ruta a 'sidebar'
  { path: 'orders', component: OrdersComponent }, // Ruta a 'orders'
  { path: 'orders/new-ot', component: NewOtComponent }, // Ruta a 'new-ot'
  { path: 'header', component: HeaderComponent }, // Ruta a 'header'
  { path: 'profile', component: ProfileComponent }, // Ruta a 'profile'
  { path: 'profile/edit-pf', component: EditPfComponent }, // Ruta a 'edit-pf'
];