import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3001'); // Asegúrate de que la URL del servidor de Socket.IO es correcta
  }

  // Emitir solicitud de servicios habilitados
  getServiciosHabilitados(id_ot: string): Observable<any> {
    this.socket.emit('getServiciosHabilitados', id_ot); // Emitir evento al servidor
    return new Observable((observer) => {
      this.socket.on('serviciosHabilitados', (data) => {
        observer.next(data); // Emitir respuesta desde el servidor
      });
      this.socket.on('error', (error) => {
        observer.error(error); // Manejar errores
      });
    });
  }

  // Emitir solicitud de servicios deshabilitados
  getServiciosDeshabilitados(id_ot: string): Observable<any> {
    this.socket.emit('getServiciosDeshabilitados', id_ot); // Emitir evento al servidor
    return new Observable((observer) => {
      this.socket.on('serviciosDeshabilitados', (data) => {
        observer.next(data); // Emitir respuesta desde el servidor
      });
      this.socket.on('error', (error) => {
        observer.error(error); // Manejar errores
      });
    });
  }
}
