import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud } from '../interfaces/solicitud';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SolicitudService {
    private myAppUrl: string;
    private myApiUrl: string;

    constructor(private http: HttpClient) {
        this.myAppUrl = environment.endpoint;
        this.myApiUrl = 'api/solicitud/';
    }

    getListSolicitudes(): Observable<Solicitud[]> {
        return this.http.get<Solicitud[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }

    deleteSolicitudes(id_sol: number): Observable<void> {
        return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id_sol}`);
    }

    saveSolicitud(solicitud: Solicitud): Observable<void> {
        return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, solicitud);
    }

    getSolicitud(id_sol: number): Observable<Solicitud> {
        return this.http.get<Solicitud>(`${this.myAppUrl}${this.myApiUrl}${id_sol}`);
    }

    updateSolicitud(id_sol: number, solicitud: Solicitud): Observable<void> {
        return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id_sol}`, solicitud);
    }

    updateSolicitudByView(id_sol: number, isView: boolean): Observable<void> {
        const url = `${this.myAppUrl}${this.myApiUrl}${id_sol}`;
        return this.http.put<void>(url, { isView });
    }

    updateSolicitudByFecha(id_sol: number, fecha_vista: Date): Observable<Date> {
        const url = `${this.myAppUrl}${this.myApiUrl}${id_sol}`;
        return this.http.put<Date>(url, { fecha_vista });
    }

    updateSolicitudByFechaEmision(id_sol: number, fecha_emision: Date): Observable<Date> {
        const url = `${this.myAppUrl}${this.myApiUrl}${id_sol}`;
        return this.http.put<Date>(url, { fecha_emision });
    }

    updateSolicitudByFechaTermino(id_sol: number, fecha_termino: Date | null): Observable<Date | null> {
        const url = `${this.myAppUrl}${this.myApiUrl}${id_sol}`;
        return this.http.put<Date | null>(url, { fecha_termino });
    }

    updateSolicitudByCompletada(id_sol: number, completada: boolean): Observable<boolean> {
        const url = `${this.myAppUrl}${this.myApiUrl}${id_sol}`;
        return this.http.put<boolean>(url, { completada });
    }
    

    getSolByUser(id_user: number): Observable<Solicitud[]> {
        return this.http.get<Solicitud[]>(`${this.myAppUrl}${this.myApiUrl}user/${id_user}`);
    }

    getSolByOt(id_ot: number): Observable<Solicitud[]> {
        return this.http.get<Solicitud[]>(`${this.myAppUrl}${this.myApiUrl}solicitud/${id_ot}`);
    }
}