import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CreateReportComponent } from './pages/create-reporte/create-reporte.component';
import { AprobacionesTickComponent } from './pages/aprobaciones-tick/aprobaciones-tick.component';
import { EditOrderComponent } from './pages/edit-order/edit-order.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import path from 'path';
import { CotizacionComponent } from './pages/cotizacion/cotizacion.component';
import { NgModule } from '@angular/core';
import { AuthRolGuard } from './auth-rol.guard';
import { CreateUsuarioComponent } from './pages/create-usuario/create-usuario.component';
import { EditUsuarioComponent } from './pages/edit-usuario/edit-usuario.component';
import { AuthGuard } from './auth.guard';
import { CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { CausaComponent } from './pages/causa/causa.component';
import { EditOrderGestorComponent } from './pages/edit-order-gestor/edit-order-gestor.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige a 'home' al inicio
  { path: 'cotizacion', component: CotizacionComponent, canActivate: [AuthRolGuard],  data: { requiredRoles: [1,3] } }, // Ruta a 'cotizacion'
  { path: 'login', component: LoginComponent }, // Ruta a 'login'
  { path: 'edit-order-gestor/:id_ot', component: EditOrderGestorComponent}, // Ruta a 'edit-order'
  { path: 'home', component: HomeComponent, canActivate: [AuthRolGuard], data: { requiredRoles: [1,2, 3] } }, // Acepta roles 2 o 3
  { path: 'orders', component: OrdersComponent, canActivate:[AuthRolGuard], data: { requiredRoles: [1,2, 3] } }, // Ruta a 'orders'
  { path: 'header', component: HeaderComponent }, // Ruta a 'header'
  { path: 'profile', component: ProfileComponent }, // Ruta a 'profile'
  { path: 'usuarios', component: UsuariosComponent }, // Ruta a 'usuarios'
  { path: 'usuarios/create-usuario', component: CreateUsuarioComponent}, // Ruta a 'create-usuario'
  { path: 'edit-order/:id_ot', component: EditOrderComponent}, // Ruta a 'edit-order'
  { path: 'reportes/createReport/:id', component: CreateReportComponent},
  { path: 'reportes/createReport/:id/:id_serv', component: DetalleComponent},
  { path: 'edit-usuario/:rut_usuario', component: EditUsuarioComponent}, // Ruta a 'aprobaciones-tick'
  {path: 'marca', component: MarcasComponent, canActivate:[AuthRolGuard], data:{requiredRoles: [1]}}, // Ruta a 'aprobaciones-tick'
  {path: 'servicios', component: ServicioComponent, canActivate:[AuthRolGuard], data:{requiredRoles: [1]}}, // Ruta a 'aprobaciones-tick'
  {path: 'causa', component: CausaComponent, canActivate:[AuthRolGuard], data:{requiredRoles: [1, 3]}}, // Ruta a 'aprobaciones-tick'

  { path: '**', redirectTo: '/login' }, // Maneja rutas no encontradas

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

