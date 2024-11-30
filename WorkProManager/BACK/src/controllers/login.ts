import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routerCliente from '../routes/cliente';
import routerTrabajador from '../routes/trabajador';
import routerServicio from '../routes/servicio';
import routerEstadoOt from '../routes/estado_ot';
import routesEquipo from '../routes/equipo';
import routerTrabajadorRol from '../routes/trabajador_rol';
import routerLogin from '../routes/login';  // Asegúrate de importar las rutas correctamente
import routerAsignacion from '../routes/asignacion';
import routerHistorialOrden from '../routes/historial_orden';
import routerOrdenTrabajo from '../routes/orden_trabajo';
import routerServicioOrden from '../routes/servicio_orden';
import cookieparser from 'cookie-parser';
import db from '../db/connection'; // Asegúrate de que aquí importas initModels

class Server {

    public app: Application;
    private port: string;

    constructor() {
        this.app = express();

        this.app.use(cookieparser());
        this.app.use(cors({
            origin: ['http://localhost:4200', 'http://localhost:54351'],   // Dirección del frontend
            credentials: true                  // Permite el envío de cookies
        }));
        this.port = process.env.PORT || '3001';

        this.middlewares();
        this.routes();
        this.dbConnect();
        this.listen();
    }

    listen() {
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

        // Rutas específicas para el login
        this.app.use('/api/login', routerLogin);  // Ya no es necesario el middleware adicional, el archivo login.ts se encarga

        // Resto de las rutas
        this.app.use('/api/asignacion', routerAsignacion);
        this.app.use('/api/cliente', routerCliente);
        this.app.use('/api/trabajador', routerTrabajador);
        this.app.use('/api/servicio', routerServicio);
        this.app.use('/api/estado_ot', routerEstadoOt);
        this.app.use('/api/equipo', routesEquipo);
        this.app.use('/api/trabajador_rol', routerTrabajadorRol);
        this.app.use('/api/historial_orden', routerHistorialOrden);
        this.app.use('/api/orden_trabajo', routerOrdenTrabajo);
        this.app.use('/api/servicio_orden', routerServicioOrden);
    }

    middlewares() {
        this.app.use(cors({
            origin: "http://localhost:4200", credentials: true
        }));
        this.app.use(express.json());
    }

    async dbConnect() {
        try {
            await db.authenticate();
            console.log('Base de datos conectada');
        } catch (error) {
            console.log('Error al conectarse a la base de datos:', error);
        }
    }
}

export default Server;
