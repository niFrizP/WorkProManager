// server.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import cookieparser from 'cookie-parser';
import db from '../db/connection';

// Importación de rutas
import routerCliente from '../routes/cliente';
import routerTrabajador from '../routes/trabajador';
import routerServicio from '../routes/servicio';
import routerEstadoOt from '../routes/estado_ot';
import routerEquipo from '../routes/equipo';
import routerTrabajadorRol from '../routes/trabajador_rol';
import routerLogin from '../routes/login';
import routerAsignacion from '../routes/asignacion';
import routerHistorialOrden from '../routes/historial_orden';
import routerOrdenTrabajo from '../routes/orden_trabajo';
import routerServicioOrden from '../routes/servicio_orden';

class Server {
    public app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
        this.port = process.env.PORT || '3001';
        this.middlewares();
        this.dbConnect();
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors({
            origin: ['http://localhost:4200', 'http://localhost:54351'],
            credentials: true
        }));

        // Parsers
        this.app.use(express.json());
        this.app.use(cookieparser());
        this.app.use(bodyparser.json());
    }

    routes() {
        // Ruta base
        this.app.get('/', (req: Request, res: Response) => {
            res.json({ msg: 'API Working' });
        });

        // Aquí se registra el router de login
        this.app.use('/api/login', routerLogin); // Registra correctamente el router

        // Otras rutas
        this.app.use('/api/cliente', routerCliente);
        this.app.use('/api/estado_ot', routerEstadoOt);
        this.app.use('/api/servicio', routerServicio);
        // Continúa con las demás rutas...
    }

    middlewares() {
        this.app.use(express.json());
            res.json({ msg: 'API Working' });
        });

        // Rutas de la API
        this.configureRoute('/api/asignacion', routerAsignacion);
        this.configureRoute('/api/cliente', routerCliente);
        this.configureRoute('/api/equipo', routerEquipo);
        this.configureRoute('/api/estado_ot', routerEstadoOt);
        this.configureRoute('/api/historial_orden', routerHistorialOrden);
        this.configureRoute('/api/historial_servicio_orden', routerHistorialServicioOrden);
        this.configureRoute('/api/login', routerLogin);
        this.configureRoute('/api/marca', routerMarca);
        this.configureRoute('/api/orden_trabajo', routerOrdenTrabajo);
        this.configureRoute('/api/servicio', routerServicio);
        this.configureRoute('/api/servicio_orden', routerServicioOrden);
        this.configureRoute('/api/trabajador', routerTrabajador);
        this.configureRoute('/api/trabajador_rol', routerTrabajadorRol);
    }

    private configureRoute(path: string, router: any) {
        this.app.use(path, (req: Request, res: Response, next: NextFunction) => {
            if (req.method === 'GET') {
                console.log(`Acceso a ${path.replace('/api/', '')}`);
            }
            next();
        }, router);
    }

    async dbConnect() {
        try {
            // Conexión a la base de datos
            console.log('Base de datos conectada');

            // Sincronizar modelos con la base de datos
            // await db.sync({ force: false }); // force: true solo en desarrollo
        } catch (error) {
            console.log('Error al conectarse a la base de datos:', error);
        }
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

export default Server;
