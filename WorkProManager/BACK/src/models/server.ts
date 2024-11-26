import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import session from 'express-session';  // Importamos express-session
import bodyparser from 'body-parser';
import dotenv from 'dotenv'; // Importación de dotenv
import socketIO from 'socket.io'; // Importación de socket.io
import http from 'http'; // Importación de http
// Importación de rutas
import routesOrder from '../routes/order';
import routesClient from '../routes/cliente';
import routesUsuario from '../routes/usuario';
import routesServicio from '../routes/servicio';
import routesEstadoOt from '../routes/estado_ot';
import routesEquipo from '../routes/equipo';
import routesRol from '../routes/rol';
import logRoutes from '../routes/log_ot';
import routesMarca from '../routes/marca';
import detalleOtRoutes from '../routes/detalle_ot';
import routesUsuarioEliminado from '../routes/usuario_eliminado';
import ordersCountByService from '../routes/order';
import queryRoutes from '../routes/query';
import causaRoutes from '../routes/causa_rechazo';
import detallecausaroutes from '../routes/detalle_causa_rechazo';
import routesTipo from '../routes/tipo';
import routesLogin from '../routes/login';
import routerSolicitud from '../routes/solicitud';
import db from '../db/connection';

class Server {
    public app: Application;
    private port: string;
    private role: string;
    private io: socketIO.Server;
    private httpServer: http.Server;

    constructor() {
        // Carga las variables de entorno
        dotenv.config();
        this.app = express();
        this.port = process.env.PORT || '3001'; // Puerto por defecto

        this.middlewares(); // Configuración de middlewares
        this.routes();        // Configuración de rutas
        this.dbConnect(); // Conexión a la base de datos
        this.listen(); // Iniciar el servidor
        this.role = this.assignRole(this.port); // Asignar rol al servidor según el puerto
        this.httpServer = new http.Server(this.app);
        this.io = new socketIO.Server(this.httpServer);

        this.configureSockets(); // Configurar sockets
    }

    /**
     * Configura los sockets para el servidor.
     */
    private configureSockets() {
        this.io.on('connection', (socket: socketIO.Socket) => {
            console.log('Cliente conectado');
            socket.on('Tarea Asignada:', (data) => {
                console.log('Tarea asignada:', data);
                this.io.emit('Tarea-actualizada:', data);
            });

            socket.on('disconnect', () => {
                console.log('Cliente desconectado');
            });
        });
    }

    /**
     * Inicia el servidor en el puerto especificado.
     */
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`);
        });
    }

    /**
     * Asigna un rol a la aplicación según el puerto.
     */
    private assignRole(port: string): string {
        if (port === '3001') {
            console.log('Servidor de admin');
            return 'admin';
        } else if (port === '3002') {
            console.log('Servidor de técnico');
            return 'tecnico';
        } else if (port === '3003') {
            console.log('Servidor de gestor');
            return 'gestor';
        }
            return 'default';
        }

    /**
     * Configuración de rutas de la aplicación.
     */
    private routes() {
        // Ruta raíz
        this.app.get('/', (req , res) => {
            res.json({ msg: 'API Funcionando' });
        });

        // Ruta para obtener el rol del servidor
        this.app.get('')

        // Definición de todas las rutas
        const routes = [
            { path: '/api/causa', handler: causaRoutes },
            { path: '/api/detallecausa', handler: detallecausaroutes },
            { path: '/api/login', handler: routesLogin },
            { path: '/api/solicitud', handler: routerSolicitud },
            { path: '/api/detalle_ot', handler: detalleOtRoutes },
            { path: '/api/log_ot', handler: logRoutes },
            { path: '/api/query', handler: queryRoutes },
            { path: '/api/clientes', handler: routesClient },
            { path: '/api/orders', handler: routesOrder },
            { path: '/api/ordersCountByService', handler: ordersCountByService },
            { path: '/api/usuario', handler: routesUsuario },
            { path: '/api/servicio', handler: routesServicio },
            { path: '/api/estado_ot', handler: routesEstadoOt },
            { path: '/api/tipo', handler: routesTipo },
            { path: '/api/equipo', handler: routesEquipo },
            { path: '/api/rol', handler: routesRol },
            { path: '/api/log', handler: logRoutes },
            { path: '/api/marca', handler: routesMarca },
            { path: '/api/usuarioEliminado', handler: routesUsuarioEliminado }
        ];

        // Asignar rutas dinámicamente y loguear acceso
        routes.forEach(route => {
            this.app.use(route.path, (req: Request, res: Response, next: Function) => {
                if (req.method === 'GET') {
                    console.log(`Acceso a ${route.path}`);
                }
                next();
            }, route.handler);
        });
    }

    /**
     * Configuración de middlewares de la aplicación.
     */
    middlewares() {
        // Middleware para cookies
        this.app.use(cookieparser());

        // Middleware para sesiones
        this.app.use(session({
            name: 'sessionId',
            secret: 'superSecretKey',
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: process.env.NODE_ENV === 'production', // Solo se envía si es HTTPS
                httpOnly: true, // La cookie no puede ser leída por JavaScript
                maxAge: 1000 * 60 * 60 * 24 // 1 día
            }
        }));

        // Middleware para gestionar orígenes con CORS
        const allowedOrigins = [
            'http://localhost:4200',
            'http://localhost:54351',
            'http://localhost:8080',
            'http://localhost:8100',
            process.env.CLIENT_URL || ''
        ];
        this.app.use(cors({
            origin: (origin, callback) => {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true
        }));

        // Middleware para parsear JSON y URL-encoded
        this.app.use(express.json());
        this.app.use(bodyparser.urlencoded({ extended: true }));
    }

    /**
     * Conexión a la base de datos y autenticación.
     */
    async dbConnect() {
        try {
            await db.authenticate();
            console.log('Base de datos conectada');
            // Inicializar los modelos después de conectar a la base de datos (si aplica)
        } catch (error) {
            console.error('Error al conectarse a la base de datos:', error);
        }
    }
}

export default Server;
