import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 
import { Order } from '../interfaces/order'; 


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

  deleteOrders(id_ot: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id_ot}`)
  }

  saveOrder(order: Order): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,order)
  }

  getOrder(id_ot: number): Observable<Order> {
    return this.http.get<Order>(`${this.myAppUrl}${this.myApiUrl}${id_ot}`)
  }

  updateOrder(id_ot: number, order: Order): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id_ot}`, order);
  }
}