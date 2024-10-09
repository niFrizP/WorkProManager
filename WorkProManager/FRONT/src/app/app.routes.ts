import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { NewOtComponent } from './pages/new-ot/new-ot.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Redirige a 'home' al inicio
  { path: 'home', component: HomeComponent }, // Ruta a 'home'
  { path: 'sidebar', component: SidebarComponent }, // Ruta a 'sidebar'
  { path: 'header', component: HeaderComponent }, // Ruta a 'header'
  { path: 'new-ot', component: NewOtComponent }, // Ruta a 'new-ot'
  { path: 'profile', component: ProfileComponent }, // Ruta a 'profile'
];
