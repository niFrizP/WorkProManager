// server.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routerCliente from '../routes/cliente';
import routerTrabajador from '../routes/trabajador';
import routerServicio from '../routes/servicio';
import routerEstadoOt from '../routes/estado_ot';
import routesEquipo from '../routes/equipo';
import routerTrabajadorRol from '../routes/trabajador_rol';
import routerLogin from '../routes/login';  // Importa solo una vez

class Server {
    public app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
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
    }

    async dbConnect() {
        try {
            // Conexión a la base de datos
            console.log('Base de datos conectada');
        } catch (error) {
            console.log('Error al conectarse a la base de datos:', error);
        }
    }
}

export default Server;
