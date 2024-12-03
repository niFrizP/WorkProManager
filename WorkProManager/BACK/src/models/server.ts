import express, { Application } from 'express';
import cors from 'cors';
import http from 'http';
import socketIo from 'socket.io';
import lusca from 'lusca'; // Importa lusca
import routesTrabajador from '../routes/trabajador';
import routesCotizacion from '../routes/insertarCotizacion';
import routesServicio from '../routes/servicio';
import routesMarca from '../routes/marca';
import routesEquipo from '../routes/equipo';
import routesServicioOrden from '../routes/insertar_servicio_orden';
import routesEstadoOT from '../routes/estado_ot';
import routesOrdenes from '../routes/orden_trabajo';
import routesGetServicioOrden from '../routes/servicio_orden';

// Importar los modelos
import Trabajador from './trabajador';
import TrabajadorRol from './trabajador_rol';
import Asignacion from './asignacion';
import Cliente from './cliente';
import Marca from './marca';
import Equipo from './equipo';
import EstadoOT from './estado_ot';
import Servicio from './servicio';
import OrdenTrabajo from './orden_trabajo';
import ServicioOrden from './servicio_orden';
import HistorialOrden from './historial_orden';
import HistorialServicioOrden from './historial_servicio_orden';
import cookieParser from 'cookie-parser';
import { fetchServiciosHabilitados, fetchServiciosDeshabilitados } from '../controllers/servicio_orden'; // Importa las funciones auxiliares

class Server {
    private app: Application;
    private port: string;
    private server: http.Server; // Servidor HTTP para Socket.IO
    private io: socketIo.Server; // Instancia de Socket.IO

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';

        // Configurar el servidor HTTP para usar con Socket.IO
        this.server = http.createServer(this.app);
        this.io = new socketIo.Server(this.server, {
            cors: {
                origin: 'http://localhost:4200', // Asegúrate de permitir el frontend Angular
                methods: ['GET', 'POST'],
                credentials: true,
            }
        });

        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();

        // Configurar eventos de Socket.IO
        this.socketEvents();
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        })
    }

    routes() {
        this.app.use('/api/trabajador', routesTrabajador);
        this.app.use('/api/cotizacion', routesCotizacion);
        this.app.use('/api/servicio', routesServicio);
        this.app.use('/api/marca', routesMarca);
        this.app.use('/api/equipo', routesEquipo);
        this.app.use('/api/servicio-orden', routesServicioOrden);
        this.app.use('/api/estado-ot', routesEstadoOT);
        this.app.use('/api/orden', routesOrdenes);
        this.app.use('/api/get-servicio-orden', routesGetServicioOrden);
    }

    midlewares() {
        // Configuración de CORS
        this.app.use(cors({
            origin: 'http://localhost:4200', // Reemplaza con la URL de tu frontend
            credentials: true, // Permitir el envío de cookies y encabezados de autorización
        }));

        // Analizar cookies
        this.app.use(cookieParser());

        // Protección CSRF con lusca
        this.app.use(lusca.csrf()); // implementación de CSRF con Lusca

        // Parseo del body
        this.app.use(express.json());
    }

    async dbConnect() {
        try {
            await Trabajador.sync();
            await TrabajadorRol.sync();
            await Asignacion.sync();
            await Cliente.sync();
            await Marca.sync();
            await Equipo.sync();
            await EstadoOT.sync();
            await Servicio.sync();
            await OrdenTrabajo.sync();
            await ServicioOrden.sync();
            await HistorialOrden.sync();
            await HistorialServicioOrden.sync();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    private socketEvents() {
        this.io.on('connection', (socket) => {
            console.log('Un cliente se ha conectado', socket.id);

            // Enviar un mensaje de bienvenida al cliente
            socket.emit('mensaje', '¡Hola desde el servidor!');

            // Recibir mensaje desde el cliente
            socket.on('mensajeCliente', (data) => {
                console.log('Mensaje recibido del cliente:', data);
            });

            // Evento para obtener servicios habilitados
            socket.on('getServiciosHabilitados', async (id_ot: string) => {
                try {
                    const serviciosHabilitados = await fetchServiciosHabilitados(id_ot);
                    if (!serviciosHabilitados || serviciosHabilitados.length === 0) {
                        socket.emit('serviciosHabilitados', { msg: 'No se encontraron servicios habilitados para esta orden.' });
                    } else {
                        socket.emit('serviciosHabilitados', serviciosHabilitados);
                    }
                } catch (error) {
                    socket.emit('error', 'Hubo un problema al obtener los servicios habilitados');
                    console.error(error);
                }
            });

            // Evento para obtener servicios deshabilitados
            socket.on('getServiciosDeshabilitados', async (id_ot: string) => {
                try {
                    const serviciosDeshabilitados = await fetchServiciosDeshabilitados(id_ot);
                    if (!serviciosDeshabilitados || serviciosDeshabilitados.length === 0) {
                        socket.emit('serviciosDeshabilitados', { msg: 'No se encontraron servicios deshabilitados para esta orden.' });
                    } else {
                        socket.emit('serviciosDeshabilitados', serviciosDeshabilitados);
                    }
                } catch (error) {
                    socket.emit('error', 'Hubo un problema al obtener los servicios deshabilitados');
                    console.error(error);
                }
            });

            // Evento cuando un cliente se desconecta
            socket.on('disconnect', () => {
                console.log('Un cliente se ha desconectado', socket.id);
            });
        });
    }
}

export default Server;
