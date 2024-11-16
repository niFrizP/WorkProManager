import { HttpClient } from '@angular/common/http';
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
// Servicio con un tipo adecuado
getCountOrdenes(startDate: string, endDate: string): Observable<{ total: number }[]> {
  const body = { startDate, endDate };
  return this.http.post<{ total: number }[]>(`${this.myAppUrl}${this.myApiUrl}`, body);
}


// Obtener el conteo de órdenes activas con filtro de fechas
getCountOrdenesActivas(startDate: string, endDate: string): Observable<{ total: number }[]> {
  const body = { startDate, endDate };
  return this.http.post<{ total: number }[]>(`${this.myAppUrl}${this.myApiUrl}orderActivas`, body);
}


getCountOrdenesEliminadas(startDate: string, endDate: string): Observable<{ total: number }[]> {
  const body = { startDate, endDate };
  return this.http.post<{ total: number }[]>(`${this.myAppUrl}${this.myApiUrl}orderEliminadas`, body);
}

getCountOrdenesByUser(startDate: string, endDate: string, rut_usuario: number): Observable<{ total: number }[]> {
  const body = { startDate, endDate, rut_usuario };
  return this.http.post<{ total: number }[]>(`${this.myAppUrl}${this.myApiUrl}orderByUsuario`, body);
}

getCountOrdenesTotalByUser(startDate: string, endDate: string, rut_usuario: number): Observable<{ total: number }[]> {
  const body = { startDate, endDate, rut_usuario };
  return this.http.post<{ total: number }[]>(`${this.myAppUrl}${this.myApiUrl}orderTotalByUsuario`, body);
}

getCountOrdenesEliminadasByUser(startDate: string, endDate: string, rut_usuario: number): Observable<{ total: number }[]> {
  const body = { startDate, endDate, rut_usuario };
  return this.http.post<{ total: number }[]>(`${this.myAppUrl}${this.myApiUrl}orderEliminadaByUsuario`, body);
}


getCountOrdenesEnTiempoAbierta(startDate: string, endDate: string): Observable<{ total: number }[]> {
  const body = { startDate, endDate };
  return this.http.post<{ total: number }[]>(`${this.myAppUrl}${this.myApiUrl}orderValidasEnTiempo`, body);
}

getCountOrdenesEnTiempoTotal(startDate: string, endDate: string): Observable<{ total: number }[]> {
  const body = { startDate, endDate };
  return this.http.post<{ total: number }[]>(`${this.myAppUrl}${this.myApiUrl}orderTotalValidasEnTiempo`, body);
}





getOrdersByEstadoByUser1(rut_usuario: number): Observable<any> {
  const body = { rut_usuario };
  return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}getuser1`, body);
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

getOrdersByUsuario(rut_usuario: number): Observable<any> {
  const body = { rut_usuario };

  // Realiza una solicitud POST sin headers
  return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}getorderbyid`, body);
}

getOrdersByUsuarioProgreso(rut_usuario: number): Observable<any> {
  const body = { rut_usuario };

  // Realiza una solicitud POST sin headers
  return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}getorderbyidenproceso`, body);
}

getOrdersByEstadoEnTiempo(): Observable<any> {
  // Realiza una solicitud POST a la API
  return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}grafico`);
} }