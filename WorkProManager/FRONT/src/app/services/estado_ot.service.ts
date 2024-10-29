import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { EstadoOT } from '../interfaces/estadoot';

@Injectable({
    providedIn: 'root'
})
export class EstadoOTService {
    private myAppUrl: string;
    private myApiUrl: string;

    constructor(private http: HttpClient) {
        this.myAppUrl = environment.endpoint;
        this.myApiUrl = 'api/estado_ot/'; // Cambiado a 'api/equipos/'
    }

    getListEstadosOT(): Observable<EstadoOT[]> {
        return this.http.get<EstadoOT[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }   

    getEstadoOT(id: number): Observable<EstadoOT> {
        return this.http.get<EstadoOT>(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }
}