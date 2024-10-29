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

    getSolByUser(id_user: number): Observable<Solicitud[]> {
        return this.http.get<Solicitud[]>(`${this.myAppUrl}${this.myApiUrl}user/${id_user}`);
    }
}