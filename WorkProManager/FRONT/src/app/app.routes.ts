// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CotizacionComponent } from './pages/cotizacion/cotizacion.component';
import { OrdersComponent } from './pages/orders/orders.component';

import { AuthGuard } from './auth.guard';
import { EditOrderComponent } from './pages/edit-order/edit-order.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },  // Protegida
  { path: 'cotizacion', component: CotizacionComponent, canActivate: [AuthGuard] }, // Protegida
  { path: 'ordenes', component: OrdersComponent, canActivate: [AuthGuard] }, // Protegida
  { path: 'ordenes/:id', component: EditOrderComponent, canActivate: [AuthGuard] }, // Protegida
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
