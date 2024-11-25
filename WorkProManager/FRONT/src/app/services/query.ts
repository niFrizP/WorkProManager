import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Reporte } from '../interfaces/reporte';
import { newOrder } from '../interfaces/newOrder';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint; // Endpoint base desde el archivo de configuración
    this.myApiUrl = 'api/query/'; // Ruta específica para el API de reportes
  }

  // Obtener la lista de reportes con filtro de fechas
  getCountOrdenes(startDate: string, endDate: string): Observable<{ total: number }[]> {
    const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get<{ total: number }[]>(`${this.myAppUrl}${this.myApiUrl}`, { params });
  }

  // Obtener el conteo de órdenes activas con filtro de fechas
  getCountOrdenesActivas(startDate: string, endDate: string): Observable<{ total: number }[]> {
    const body = { startDate, endDate };
    return this.http.post<{ total: number }[]>(`${this.myAppUrl}${this.myApiUrl}orderActivas`, body);
  }

  // Obtener el conteo de órdenes eliminadas con filtro de fechas
  getCountOrdenesEliminadas(startDate: string, endDate: string): Observable<{ total: number }[]> {
    const body = { startDate, endDate };
    return this.http.post<{ total: number }[]>(`${this.myAppUrl}${this.myApiUrl}orderEliminadas`, body);
  }

  // Obtener el conteo de órdenes por usuario
  getCountOrdenesByUser(startDate: string, endDate: string, rut_usuario: number): Observable<{ total: number }[]> {
    const body = { startDate, endDate, rut_usuario };
    return this.http.post<{ total: number }[]>(`${this.myAppUrl}${this.myApiUrl}orderByUsuario`, body);
  }

  // Obtener el conteo total de órdenes por usuario
  getCountOrdenesTotalByUser(startDate: string, endDate: string, rut_usuario: number): Observable<{ total: number }[]> {
    const body = { startDate, endDate, rut_usuario };
    return this.http.post<{ total: number }[]>(`${this.myAppUrl}${this.myApiUrl}orderTotalByUsuario`, body);
  }

  // Obtener el conteo de órdenes eliminadas por usuario
  getCountOrdenesEliminadasByUser(startDate: string, endDate: string, rut_usuario: number): Observable<{ total: number }[]> {
    const body = { startDate, endDate, rut_usuario };
    return this.http.post<{ total: number }[]>(`${this.myAppUrl}${this.myApiUrl}orderEliminadaByUsuario`, body);
  }

  // Obtener el conteo de órdenes válidas en tiempo abiertas
  getCountOrdenesEnTiempoAbierta(startDate: string, endDate: string): Observable<{ total: number }[]> {
    const body = { startDate, endDate };
    return this.http.post<{ total: number }[]>(`${this.myAppUrl}${this.myApiUrl}orderValidasEnTiempo`, body);
  }

  // Obtener el conteo total de órdenes válidas en tiempo
  getCountOrdenesEnTiempoTotal(startDate: string, endDate: string): Observable<{ total: number }[]> {
    const body = { startDate, endDate };
    return this.http.post<{ total: number }[]>(`${this.myAppUrl}${this.myApiUrl}orderTotalValidasEnTiempo`, body);
  }

  // Obtener órdenes por estado y usuario (diferentes casos)
  getOrdersByEstadoByUser1(rut_usuario: number): Observable<{ estado: string, cantidad: number }[]> {
    const body = { rut_usuario };
    return this.http.post<{ estado: string, cantidad: number }[]>(`${this.myAppUrl}${this.myApiUrl}getuser1`, body);
  }

  getOrdersByEstadoByUser2(rut_usuario: number): Observable<any> {
    const body = { rut_usuario };
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}getuser2`, body);
  }

  getOrdersByEstadoByUser3(rut_usuario: number): Observable<any> {
    const body = { rut_usuario };
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}getuser3`, body);
  }

  getOrdersByEstadoByUser4(rut_usuario: number): Observable<any> {
    const body = { rut_usuario };
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}getuser4`, body);
  }

  getOrdersByEstadoByUser5(rut_usuario: number): Observable<any> {
    const body = { rut_usuario };
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}getuser5`, body);
  }

  // Obtener órdenes por usuario
  getOrdersByUsuario(rut_usuario: number): Observable<any> {
    const body = { rut_usuario };
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}getorderbyid`, body);
  }

  // Obtener órdenes en progreso por usuario
  getOrdersByUsuarioProgreso(rut_usuario: number): Observable<any> {
    const body = { rut_usuario };
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}getorderbyidenproceso`, body);
  }

  // Obtener estado de órdenes en tiempo (para gráficos)
  getOrdersByEstadoEnTiempo(): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}grafico`);
  }
}
