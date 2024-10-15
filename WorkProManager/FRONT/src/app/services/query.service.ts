import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 
import { newOrder } from '../interfaces/newOrder'; 

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/query/';
  }

  getOrdersByEstado(): Observable<newOrder[]> {
    return this.http.get<newOrder[]>(`${this.myAppUrl}${this.myApiUrl}estado`);
  }

  getOrdersByEstadoSum(): Observable<newOrder[]> {
    return this.http.get<newOrder[]>(`${this.myAppUrl}${this.myApiUrl}estadoot`);
  }

  getOrdersByUsuario(): Observable<newOrder[]> {
    return this.http.get<newOrder[]>(`${this.myAppUrl}${this.myApiUrl}usuario`);
  }

  getOrdersByDay(): Observable<newOrder[]> {
    return this.http.get<newOrder[]>(`${this.myAppUrl}${this.myApiUrl}dia`);
  }

  getOrdersCosto(): Observable<newOrder[]> {
    return this.http.get<newOrder[]>(`${this.myAppUrl}${this.myApiUrl}costo`);
  }

  getOrdersEstadoSum(): Observable<newOrder[]> {
    return this.http.get<newOrder[]>(`${this.myAppUrl}${this.myApiUrl}estado-sum`);
  }

  getOrdersByFecha(): Observable<newOrder[]> {
    return this.http.get<newOrder[]>(`${this.myAppUrl}${this.myApiUrl}fecha`);
  }

  getOrdersByYear(): Observable<newOrder[]> {
    return this.http.get<newOrder[]>(`${this.myAppUrl}${this.myApiUrl}anio`);
  }

  getOrdersFromLast7DaysExcludingWeekends(): Observable<newOrder[]> {
    return this.http.get<newOrder[]>(`${this.myAppUrl}${this.myApiUrl}last7days-exclude-weekends`);
  }

  getOrdersByMonthAndYear(): Observable<newOrder[]> {
    return this.http.get<newOrder[]>(`${this.myAppUrl}${this.myApiUrl}month-year`);
  }

  getOrder(id: number): Observable<newOrder> {
    return this.http.get<newOrder>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveOrder(newOrder: newOrder): Observable<newOrder> {
    return this.http.post<newOrder>(`${this.myAppUrl}${this.myApiUrl}`, newOrder);
  }

  updateOrder(id: number, order: newOrder): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, order);
  }
}
