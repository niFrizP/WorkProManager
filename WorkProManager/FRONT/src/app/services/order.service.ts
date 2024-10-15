import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 
import { Order } from '../interfaces/order'; 
import { newOrder } from '../interfaces/newOrder';


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

 

  getListOrders(): Observable<Order[]> {
   return this.http.get<Order[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getlistnewOrders(): Observable<newOrder[]> {
    return this.http.get<newOrder[]>(`${this.myAppUrl}${this.myApiUrl}`);
  } 

  deleteOrders(id_ot: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id_ot}`)
  }

  saveOrder(order: Order): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,order)
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
  updateOrderState(id_ot: number, id_estado: number): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id_ot}`, { id_estado });
  }
}