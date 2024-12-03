// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CotizacionComponent } from './pages/cotizacion/cotizacion.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { EditOrderComponent } from './pages/edit-order/edit-order.component';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CreateTrabajadorComponent } from './components/create-usuario/create-usuario.component';

import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cotizacion', component: CotizacionComponent, canActivate: [AuthGuard] },
  { path: 'ordenes', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'ordenes/:id', component: EditOrderComponent, canActivate: [AuthGuard] },
  { path: 'marcas', component: MarcasComponent, canActivate: [AuthGuard] },
  { path: 'servicios', component: ServicioComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'create-usuario', component: CreateTrabajadorComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
