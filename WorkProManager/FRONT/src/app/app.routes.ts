import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { NewOtComponent } from './pages/orders/new-ot/new-ot.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CreateReportComponent } from './pages/create-reporte/create-reporte.component';
import { AprobacionesTickComponent } from './pages/aprobaciones-tick/aprobaciones-tick.component';
import { EditOrderComponent } from './pages/edit-order/edit-order.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import path from 'path';
import { CotizacionComponent } from './pages/cotizacion/cotizacion.component';
import { NgModule } from '@angular/core';
import { AuthRolGuard } from './auth-rol.guard';
import { AuthGuard } from './auth.guard';
import { CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige a 'home' al inicio
  { path: 'cotizacion', component: CotizacionComponent, canActivate: [AuthRolGuard],  data: { requiredRoles: [1,3] } }, // Ruta a 'cotizacion'
  { path: 'login', component: LoginComponent }, // Ruta a 'login'
  { path: 'home', component: HomeComponent, canActivate: [AuthRolGuard], data: { requiredRoles: [1,2, 3] } }, // Acepta roles 2 o 3
  { path: 'orders', component: OrdersComponent, canActivate:[AuthRolGuard], data: { requiredRoles: [1,2, 3] } }, // Ruta a 'orders'
  { path: 'orders/new-ot', component: NewOtComponent}, // Ruta a 'new-ot'
  { path: 'header', component: HeaderComponent }, // Ruta a 'header'
  { path: 'profile', component: ProfileComponent }, // Ruta a 'profile'
  { path: 'usuarios', component: UsuariosComponent }, // Ruta a 'usuarios'
  { path: 'edit-order/:id_ot', component: EditOrderComponent}, // Ruta a 'edit-order'
  { path: 'reportes', component: ReportesComponent, canActivate:[AuthRolGuard], data:{requiredRoles: [1,2, 3]}}, // Ruta a 'reportes'
  { path: 'reportes/createReport/:id', component: CreateReportComponent},
  { path: 'reportes/createReport/:id/:id_serv', component: DetalleComponent},
  { path: '**', redirectTo: '/login' }, // Maneja rutas no encontradas

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

