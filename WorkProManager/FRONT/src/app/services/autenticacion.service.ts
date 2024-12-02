import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Asegúrate de tener el apiUrl configurado


  constructor(private http: HttpClient) {



  }

  login(credentials: { rut_trab: string, clave: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/trabajador/login`, credentials, {
      withCredentials: true  // Asegura que las cookies se envíen con la solicitud
    });
  }



    // Método para verificar la validez del token
    verifyToken(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/api/trabajador/verify-token`, { withCredentials: true }).pipe(
        map(response => {
          // Extraemos solo lo que necesitamos de la respuesta
          const userRole = response.user.id_rol; // El rol del usuario
          const userRut = response.user.rut_trab; // El RUT del usuario
          return { userRole, userRut }; // Retornamos los datos filtrados
        })
      );
    }

    logout(): Observable<any> {
      return this.http.post(`${this.apiUrl}/api/trabajador/logout`, {}, {
          withCredentials: true, // Asegura que las cookies se manejen correctamente
      });
  }
  
}
