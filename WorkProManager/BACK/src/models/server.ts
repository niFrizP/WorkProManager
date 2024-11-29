import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routerCliente from '../routes/cliente';
import routerTrabajador from '../routes/trabajador';
import routerServicio from '../routes/servicio';
import routerEstadoOt from '../routes/estado_ot';
import routesEquipo from '../routes/equipo';
import routerTrabajadorRol from '../routes/trabajador_rol';
import routerLogin from '../routes/login';
import routerAsignacion from '../routes/asignacion';
import routerHistorialOrden from '../routes/historial_orden';
import routerOrdenTrabajo from '../routes/orden_trabajo';
import routerServicioOrden from '../routes/servicio_orden';
//import ordersCountByService from '../routes/order';

import bodyparser from 'body-parser';
import cookieparser from 'cookie-parser';

import db from '../db/connection'; // Asegúrate de que aquí importas initModels

class Server {
    
    public app: Application;
    private port: string;

    constructor() {
        this.app = express();

        this.app.use(cookieparser());
        this.app.use(cors({
            origin: ['http://localhost:4200','http://localhost:54351'],   // Dirección del frontend
            credentials: true                  // Permite el envío de cookies
        }));
        this.port = process.env.PORT || '3001';
        const JWT_SECRET = process.env.JWT_SECRET;

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

        this.app.use('/api/asignacion', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a login');
            }
            next();
        }, routerAsignacion);

        this.app.use('/api/cliente', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a login');
            }
            next();
        }, routerCliente);
       

        this.app.use('/api/login', (req: Request, res: Response, next: NextFunction) => {
            if (req.method === 'POST') {
                console.log('Acceso a login');
            }
            next();
        }, routerLogin);

        this.app.use('/api/clientes', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a clientes');
            }
            next();
        }, routerCliente);


        //this.app.use('/api/ordersCountByService', (req: Request, res: Response, next: Function) => {
            //if (req.method === 'GET') {
                //console.log('Acceso a órdenes');
            //}
            //next();
        //}, ordersCountByService);
    
        this.app.use('/api/trabajador', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a trabajadores');
            }
            next();
        }, routerTrabajador);
    
        this.app.use('/api/servicio', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a servicios');
            }
            next();
        }, routerServicio);
    
        this.app.use('/api/estado_ot', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a estado de órdenes de trabajo');
            }
            next();
        }, routerEstadoOt);
    
        this.app.use('/api/equipo', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a equipos');
            }
            next();
        }, routesEquipo);

        this.app.use('/api/trabajador_rol', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a roles');
            }
            next();
        }, routerTrabajadorRol);

        this.app.use('/api/historial_orden', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso al historial de órdenes');
            }
            next();
        }, routerHistorialOrden);


        this.app.use('/api/orden_trabajo', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a órdenes de trabajo');
            }
            next();
        }, routerOrdenTrabajo);  


        this.app.use('/api/servicio_orden', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a servicios de órdenes');
            }
            next();
        }, routerServicioOrden);

     
    }

    middlewares() {
        this.app.use(cors({ origin: "http://localhost:4200", credentials: true
        }));
        this.app.use(express.json());
    }

    async dbConnect() {
        try {
            await db.authenticate();
            console.log('Base de datos conectada');

            // Inicializar los modelos después de conectar a la base de datos

        } catch (error) {
            console.log('Error al conectarse a la base de datos:', error);
        }
    }
}

export default Server;