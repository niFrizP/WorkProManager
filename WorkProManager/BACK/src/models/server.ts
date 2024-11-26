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
import adjudicacionRoutes from '../routes/adjudicacion';
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

    routes() {


        
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API Working'
            });
        });

        this.app.use('/api/causa', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a login');
            }
            next();
        }, causaRoutes);
        this.app.use('/api/adjudicacion', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a login');
            }
            next();
        }, adjudicacionRoutes);
        this.app.use('/api/detallecausa', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a login');
            }
            next();
        }, detallecausaroutes);
       

        this.app.use('/api/login', (req: Request, res: Response, next: Function) => {
            if (req.method === 'POST') {
                console.log('Acceso a login');
            }
            next();
        }, routesLogin);
       

        this.app.use('/api/solicitud', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a solicitudes');
            }
            next();
        }, routerSolicitud);

        this.app.use('/api/detalle_ot', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a detalles de órdenes de trabajo');
            }
            next();
        }, detalleOtRoutes);

        this.app.use('/api/log_ot', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a logs de órdenes de trabajo');
            }
            next();
        }, logRoutes);

        this.app.use('/api/query', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a consultas');
            }
            next();
        }, queryRoutes);

        this.app.use('/api/clientes', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a clientes');
            }
            next();
        }, routesClient);
    
        this.app.use('/api/orders', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a órdenes');
            }
            next();
        }, routesOrder);

        this.app.use('/api/ordersCountByService', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a órdenes');
            }
            next();
        }, ordersCountByService);
    
        this.app.use('/api/usuario', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a usuarios');
            }
            next();
        }, routesUsuario);
    
        this.app.use('/api/servicio', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a servicios');
            }
            next();
        }, routesServicio);
    
        this.app.use('/api/estado_ot', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a estado de órdenes de trabajo');
            }
            next();
        }, routesEstadoOt);

        this.app.use('/api/tipo', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a tipos');
            }
            next();
        }, routesTipo);
    
        this.app.use('/api/equipo', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a equipos');
            }
            next();
        }, routesEquipo);

        this.app.use('/api/rol', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a roles');
            }
            next();
        }, routesRol);

        this.app.use('/api/log', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a logs');
            }
            next();
        }, logRoutes);


        this.app.use('/api/marca', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a marcas');
            }
            next();
        }, routesMarca);  


        this.app.use('/api/usuarioEliminado', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a usuarios eliminados');
            }
            next();
        }, routesUsuarioEliminado);

     
    }

    middlewares() {
        this.app.use(cors({ origin: "http://localhost:4200", credentials: true
        }));
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
