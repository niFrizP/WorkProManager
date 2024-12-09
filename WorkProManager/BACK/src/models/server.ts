import express, { Application } from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIoServer } from 'socket.io';
import lusca from 'lusca';
import session from 'express-session';
import cookieParser from 'cookie-parser';

// Rutas
import routesTrabajador from '../routes/trabajador';
import routesCotizacion from '../routes/insertarCotizacion';
import routesServicio from '../routes/servicio';
import routesMarca from '../routes/marca';
import routesEquipo from '../routes/equipo';
import routesServicioOrden from '../routes/insertar_servicio_orden';
import routesEstadoOT from '../routes/estado_ot';
import routesOrdenes from '../routes/orden_trabajo';
import routesGetServicioOrden from '../routes/servicio_orden';

// Modelos
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

// Controladores
import { fetchServiciosHabilitados, fetchServiciosDeshabilitados } from '../controllers/servicio_orden';

class Server {
    private app: Application;
    private port: string;
    private server: http.Server;
    private io: SocketIoServer;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';

        // Configuración de HTTP y Socket.IO
        this.server = http.createServer(this.app);
        this.io = new SocketIoServer(this.server, {
            cors: {
                origin: 'http://localhost:4200', // Frontend Angular
                methods: ['GET', 'POST'],
                credentials: true,
            }
        });

        this.config();
        this.listen();
        this.routes();
        this.dbConnect();
        this.socketEvents();
    }

    // Configurar middlewares esenciales
    private config() {
        this.app.use(cors({
            origin: 'http://localhost:4200', // Reemplazar con la URL de tu frontend
            credentials: true,
        }));

        this.app.use(express.json());
        this.app.use(cookieParser());

        // Configurar sesiones
        this.app.use(session({
            secret: process.env.SECRET_KEY || 'default-secret', // Usa una variable de entorno más segura
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
            }
        }));

        // Protección con Lusca para medidas de seguridad básicas
        this.app.use(lusca({
            xframe: 'SAMEORIGIN',
            xssProtection: true
        }));
    }

    // Configurar las rutas
    private routes() {
        this.app.use('/api/trabajador', routesTrabajador);
        this.app.use('/api/cotizacion', routesCotizacion);
        this.app.use('/api/servicio', routesServicio);
        this.app.use('/api/marca', routesMarca);
        this.app.use('/api/equipo', routesEquipo);
        this.app.use('/api/servicio-orden', routesServicioOrden);
        this.app.use('/api/estado-ot', routesEstadoOT);
        this.app.use('/api/orden', routesOrdenes);
        this.app.use('/api/get-servicio-orden', routesGetServicioOrden);
        this.app.use('/api/reset-password', routesTrabajador);
    }

    // Iniciar el servidor
    private listen() {
        this.server.listen(this.port, () => {
            console.log('Aplicación corriendo en el puerto ' + this.port);
        });
    }

    // Conectar a la base de datos y sincronizar los modelos
    private async dbConnect() {
        try {
            await Promise.all([
                Trabajador.sync(),
                TrabajadorRol.sync(),
                Asignacion.sync(),
                Cliente.sync(),
                Marca.sync(),
                Equipo.sync(),
                EstadoOT.sync(),
                Servicio.sync(),
                OrdenTrabajo.sync(),
                ServicioOrden.sync(),
                HistorialOrden.sync(),
                HistorialServicioOrden.sync()
            ]);
            console.log('Conexión a la base de datos exitosa');
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
        }
    }

    // Eventos de Socket.IO
    private socketEvents() {
        this.io.on('connection', (socket) => {
            console.log('Un cliente se ha conectado', socket.id);

            // Evento de bienvenida
            socket.emit('mensaje', '¡Hola desde el servidor!');

            // Escuchar mensaje desde el cliente
            socket.on('mensajeCliente', (data) => {
                console.log('Mensaje recibido del cliente:', data);
            });

            // Obtener servicios habilitados para una orden específica
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

            // Obtener servicios deshabilitados para una orden específica
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

            // Desconexión del cliente
            socket.on('disconnect', () => {
                console.log('Un cliente se ha desconectado', socket.id);
            });
        });
    }
}

export default Server;
