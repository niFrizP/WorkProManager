import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { EstadoOT } from '../interfaces/estadoot';
import { CausaRechazo } from '../interfaces/causa_rechazo';

@Injectable({
    providedIn: 'root'
})
export class CausaRechazoService {
    private myAppUrl: string;
    private myApiUrl: string;

    constructor(private http: HttpClient) {
        this.myAppUrl = environment.endpoint;
        this.myApiUrl = 'api/causa/'; // Cambiado a 'api/equipos/'
    }

    getListCausaRechazo(): Observable<CausaRechazo[]> {
        return this.http.get<CausaRechazo[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }   

    getCausaRechazo(id: number| undefined): Observable<CausaRechazo> {
        return this.http.get<CausaRechazo>(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }

    savecausaRechazo(causa: CausaRechazo): Observable<CausaRechazo> {
        return this.http.post<CausaRechazo>(`${this.myAppUrl}${this.myApiUrl}`, causa);
    }

    deletecausaRechazo(id: number): Observable<CausaRechazo> {
        return this.http.delete<CausaRechazo>(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }
    deshabilitarCausaRechazo(id: number, isactivo: boolean): Observable<CausaRechazo> {
        // El cuerpo del PUT es un objeto con la propiedad isactiva
        const body = { isactiva: isactivo };
    
        // Realizamos el PUT con el ID y el cuerpo que contiene el nuevo estado de isactiva
        return this.http.put<CausaRechazo>(`${this.myAppUrl}${this.myApiUrl}${id}`, body);
      }

}