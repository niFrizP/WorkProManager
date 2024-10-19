import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routesOrder from '../routes/order';
import routesClient from '../routes/cliente';
import routesUsuario from '../routes/usuario';
import routesServicio from '../routes/servicio';
import routesEstadoOt from '../routes/estado_ot';
import routesEquipo from '../routes/equipo';
import routesRol from '../routes/rol';
import logRoutes from '../routes/log';
import routesPago from '../routes/pago'; 
import routesMarca from '../routes/marca';
import routesUsuarioEliminado from '../routes/usuario_eliminado';
import ordersCountByService from '../routes/order';
import queryRoutes from '../routes/query';
import routesTipo from '../routes/tipo';
import db from '../db/connection'; // Asegúrate de que aquí importas initModels

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

        this.app.use('/api/pago', (req: Request, res: Response, next: Function) => {
            if (req.method === 'GET') {
                console.log('Acceso a pagos');
            }
            next();
        }, routesPago);

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
        this.app.use(cors());
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
