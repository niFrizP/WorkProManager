import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 
import { Order } from '../interfaces/order'; 
import { newOrder } from '../interfaces/newOrder';
import { orderEstado } from '../interfaces/newOrder';
import { OrderMonthData } from '../interfaces/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/orders/'
  }

 

  getListOrders(): Observable<newOrder[]> {
   return this.http.get<newOrder[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getOrdersCountPorRealizar(): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}countabiertas`);
  }

  getOrdersListByTecnico(rut_usuario: number): Observable<newOrder[]> {
    // El cuerpo se pasa directamente en la solicitud sin encabezados adicionales
    return this.http.post<newOrder[]>(`${this.myAppUrl}${this.myApiUrl}tecnico`, { rut_usuario });
  }

  getOrdersCountCerradas(): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}countcerradas`);
  }

  getOrdersCountPorRealizarTecnico(rut_usuario: number): Observable<any> {
    const body = { rut_usuario };  // Define el body correctamente
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}cotizacionesabiertastecnico`, body);  // Envía el body
  }
  

  getOrdersCountByMonthEliminadasByMonth(): Observable<OrderMonthData[]> {
    return this.http.get<OrderMonthData[]>(`${this.myAppUrl}${this.myApiUrl}count12meseseliminadas`);
  }

  getlistnewOrders(): Observable<newOrder[]> {
    return this.http.get<newOrder[]>(`${this.myAppUrl}${this.myApiUrl}`);
  } 

  getlistOrdersReporteGeneral(): Observable<newOrder[]> {
    return this.http.get<newOrder[]>(`${this.myAppUrl}${this.myApiUrl}reportesGeneral`);
  }

  gelistOrdersReporteTecnico(rut_usuario:number): Observable<newOrder[]> {
    return this.http.post<newOrder[]>(`${this.myAppUrl}${this.myApiUrl}reportestecnico`, {rut_usuario});
  }
  
  getlistOrdersCotizacionesGeneral(): Observable<newOrder[]> {
    return this.http.get<newOrder[]>(`${this.myAppUrl}${this.myApiUrl}cotizacionesGeneral`);
  }

  getListEliminadas(): Observable<newOrder[]> {
    return this.http.get<newOrder[]>(`${this.myAppUrl}${this.myApiUrl}rechazadass`);
  }

  getListCompletas(): Observable<newOrder[]> {
    return this.http.get<newOrder[]>(`${this.myAppUrl}${this.myApiUrl}completass`);
  }
  

  deleteOrders(id_ot: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id_ot}`)
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.myAppUrl}${this.myApiUrl}`,order)
  }

  getOrder(id_ot: number): Observable<Order> {
    return this.http.get<Order>(`${this.myAppUrl}${this.myApiUrl}${id_ot}`)
  }

  getNewOrder(id_ot: number): Observable<newOrder> {
    return this.http.get<newOrder>(`${this.myAppUrl}${this.myApiUrl}${id_ot}`)
  }

  updateOrder(id_ot: number, order: Order): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id_ot}`, order);
  }


  // Nuevo método para actualizar solo el id_estado
  updateOrderState(id_ot: number, id_estado_ot: number): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id_ot}`, { id_estado_ot });
  }

  countOrderNotifications(): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}countOrderN`);
  }

  countOrderNotificationsCotizacionesByRut(rut_usuario:number): Observable<any> {
    const body = { rut_usuario }
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}countOrderNCotizacionesByRut`, {rut_usuario});
  }

  countOrderNotificationsReportesByRut(rut_usuario:number): Observable<any> {
    const body = { rut_usuario }
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}countOrderNReportesByRut`, {rut_usuario});
  }


  countOrderNotificationsReportes(): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}countOrderNReportes`);
  }

  countOrderNotificationsFinalizadas(): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}countOrderNFinalizadas`);
  }

  countOrderNotificationsRechazadas(): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}countOrderNRechazadas`);
  }

  


}