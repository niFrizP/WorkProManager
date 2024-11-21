import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { DetalleCausaRechazo } from '../interfaces/detalle_causa_rechazo';

@Injectable({
  providedIn: 'root'
})  

export class DetalleCausaRechazoService {

    private myAppUrl: string;
    private myApiUrl: string;

    constructor(private http: HttpClient) { 
        this.myAppUrl = environment.endpoint;
        this.myApiUrl = 'api/detallecausa/'
    }

    getListDetalleOT(): Observable<DetalleCausaRechazo[]> {
        return this.http.get<DetalleCausaRechazo[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }

    getListDetalleOTByOTId(id_ot: number): Observable<DetalleCausaRechazo[]> {
        return this.http.get<DetalleCausaRechazo[]>(`${this.myAppUrl}${this.myApiUrl}${id_ot}`);
    }

    getListDetalleOTByOT(id_ot: number, id_rechazo: number): Observable<DetalleCausaRechazo[]> {
        return this.http.get<DetalleCausaRechazo[]>(`${this.myAppUrl}${this.myApiUrl}${id_ot}/${id_rechazo}`);
    }

    saveDetalleOT(detalleOTRechazo: DetalleCausaRechazo): Observable<void> {
        return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, detalleOTRechazo);
    }

    deleteDetalleOT(id_ot: number,id_rechazo: number): Observable<void> {
        return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id_ot}/${id_rechazo}`);
    }



    deleteDetalleOTByOtId(id_ot: number): Observable<void> {
        return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id_ot}`);
    }

    
  getDetalleOt(id_ot: number, id_serv: number): Observable<DetalleCausaRechazo> {
    return this.http.get<DetalleCausaRechazo>(`${this.myAppUrl}${this.myApiUrl}${id_ot}/${id_serv}`);
  }

    updateDetalleOT(id_ot: number,id_rechazo: number, detalleOTRechazo: DetalleCausaRechazo): Observable<void> {
        return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id_ot}/${id_rechazo}`, detalleOTRechazo);
    }

    countRechazos(id_rechazo: number): Observable<number> {
        return this.http.get<number>(`${this.myAppUrl}${this.myApiUrl}count/${id_rechazo}`);
    }
    

}
