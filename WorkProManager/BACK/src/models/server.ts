import express, { Application } from 'express';
import cors from 'cors';
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

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();

    }

    listen() {
        this.app.listen(this.port, () => {
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
        // Parseo body
         // Configuración de CORS
  this.app.use(cors({
    origin: 'http://localhost:4200', // Reemplaza con la URL de tu frontend
    credentials: true, // Permitir el envío de cookies y encabezados de autorización
  }));

   // Analizar cookies
   this.app.use(cookieParser()); // <--- Aquí

  // Parseo del body
  this.app.use(express.json());
    }

    async dbConnect() {
        try {
            await Trabajador.sync()
            await TrabajadorRol.sync()
            await Asignacion.sync()
            await Cliente.sync()
            await Marca.sync()
            await Equipo.sync()
            await EstadoOT.sync()
            await Servicio.sync()
            await OrdenTrabajo.sync()
            await ServicioOrden.sync()
            await HistorialOrden.sync()
            await HistorialServicioOrden.sync()

        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

}

export default Server;
