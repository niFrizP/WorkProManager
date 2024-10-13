import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routesOrder from '../routes/order';
import routesClient from '../routes/cliente';
import routesUsuario from '../routes/usuario'
import routesServicio from '../routes/servicio'
import routesEstadoOt from '../routes/estado_ot'
import routesEquipo from '../routes/equipo'
import routesRol from '../routes/rol'
import logRoutes from '../routes/log'
import routesPago from '../routes/pago' 
import routesMarca from '../routes/marca'
import db from '../db/connection';


class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
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
    
        this.app.use('/api/clientes', (req: Request, res: Response, next: Function) => {
            // Lógica específica para clientes
            if (req.method === 'GET') {
                console.log('Acceso a clientes');
            }
            next();
        }, routesClient); // Acceso a los clientes
    
        this.app.use('/api/orders', (req: Request, res: Response, next: Function) => {
            // Lógica específica para órdenes
            if (req.method === 'GET') {
                console.log('Acceso a órdenes');
            }
            next();
        }, routesOrder); // Acceso a las órdenes
    
        this.app.use('/api/usuario', (req: Request, res: Response, next: Function) => {
            // Lógica específica para usuarios
            if (req.method === 'GET') {
                console.log('Acceso a usuarios');
            }
            next();
        }, routesUsuario); // Acceso a los usuarios
    
        this.app.use('/api/servicio', (req: Request, res: Response, next: Function) => {
            // Lógica específica para servicios
            if (req.method === 'GET') {
                console.log('Acceso a servicios');
            }
            next();
        }, routesServicio); // Acceso a los servicios
    
        this.app.use('/api/estado_ot', (req: Request, res: Response, next: Function) => {
            // Lógica específica para estado de órdenes de trabajo
            if (req.method === 'GET') {
                console.log('Acceso a estado de órdenes de trabajo');
            }
            next();
        }, routesEstadoOt); // Acceso a los estados de órdenes de trabajo
    
        this.app.use('/api/equipo', (req: Request, res: Response, next: Function) => {
            // Lógica específica para equipos
            if (req.method === 'GET') {
                console.log('Acceso a equipos');
            }
            next();
        }, routesEquipo); // Acceso a los equipos

        this.app.use('/api/rol', (req: Request, res: Response, next: Function) => {
            // Lógica específica para roles
            if (req.method === 'GET') {
                console.log('Acceso a roles');
            }
            next();
        }, routesRol); // Acceso a los roles

        this.app.use('/api/log', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a logs');
            }
            next();
        }, logRoutes); // Acceso a los logs

        this.app.use('/api/pago', (req: Request, res: Response, next: Function) => {
            // Lógica específica para pagos
            if (req.method === 'GET') {
                console.log('Acceso a pagos');
            }
            next();
        }, routesPago); // Acceso a los pagos

        this.app.use('/api/marca', (req: Request, res: Response, next: Function) => {
            // Lógica específica para servicios
            if (req.method === 'GET') {
                console.log('Acceso a servicios');
            }
            next();
        }, routesMarca); // Acceso a los servicios
        

    }

    
    


    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
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