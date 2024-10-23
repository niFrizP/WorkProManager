import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleOT } from '../interfaces/detalle_ot';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})  

export class DetalleOTService {

    private myAppUrl: string;
    private myApiUrl: string;

    constructor(private http: HttpClient) { 
        this.myAppUrl = environment.endpoint;
        this.myApiUrl = 'api/detalle_ot/'
    }

    getListDetalleOT(): Observable<DetalleOT[]> {
        return this.http.get<DetalleOT[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }

    getListDetalleOTByOTId(id_ot: number): Observable<DetalleOT[]> {
        return this.http.get<DetalleOT[]>(`${this.myAppUrl}${this.myApiUrl}${id_ot}`);
    }

    getListDetalleOTByOT(id_ot: number, id_serv: number): Observable<DetalleOT[]> {
        return this.http.get<DetalleOT[]>(`${this.myAppUrl}${this.myApiUrl}${id_ot}/${id_serv}`);
    }

    saveDetalleOT(detalleOT: DetalleOT): Observable<void> {
        return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, detalleOT);
    }

    deleteDetalleOT(id_ot: number,id_serv: number): Observable<void> {
        return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id_ot}/${id_serv}`);
    }

    updateDetalleOT(id_ot: number,id_serv: number, detalleOT: DetalleOT): Observable<void> {
        return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id_ot}/${id_serv}`, detalleOT);
    }
}
