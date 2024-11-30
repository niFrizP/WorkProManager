"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Importación de rutas
const cliente_1 = __importDefault(require("../routes/cliente"));
const trabajador_1 = __importDefault(require("../routes/trabajador"));
const servicio_1 = __importDefault(require("../routes/servicio"));
const estado_ot_1 = __importDefault(require("../routes/estado_ot"));
const equipo_1 = __importDefault(require("../routes/equipo"));
const trabajador_rol_1 = __importDefault(require("../routes/trabajador_rol"));
const login_1 = __importDefault(require("../routes/login"));
const asignacion_1 = __importDefault(require("../routes/asignacion"));
const historial_orden_1 = __importDefault(require("../routes/historial_orden"));
const orden_trabajo_1 = __importDefault(require("../routes/orden_trabajo"));
const servicio_orden_1 = __importDefault(require("../routes/servicio_orden"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)({ origin: 'http://localhost:4200', credentials: true }));
        this.port = process.env.PORT || '3001';
        this.middlewares();
        this.dbConnect();
        this.routes();
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)({
            origin: ['http://localhost:4200', 'http://localhost:54351'],
            credentials: true
        }));
        // Parsers
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(body_parser_1.default.json());
    }
    routes() {
        // Ruta base
        this.app.get('/', (req, res) => {
            res.json({ msg: 'API Working' });
        });
        // Aquí se registra el router de login
        this.app.use('/api/login', login_1.default); // Registra correctamente el router
        // Otras rutas
        this.app.use('/api/cliente', cliente_1.default);
        this.app.use('/api/estado_ot', estado_ot_1.default);
        this.app.use('/api/servicio', servicio_1.default);
        // Continúa con las demás rutas...
    }
    middlewares() {
        this.app.use(express_1.default.json());
        res.json({ msg: 'API Working' });
    }
    ;
}
// Rutas de la API
this.configureRoute('/api/asignacion', asignacion_1.default);
this.configureRoute('/api/cliente', cliente_1.default);
this.configureRoute('/api/equipo', equipo_1.default);
this.configureRoute('/api/estado_ot', estado_ot_1.default);
this.configureRoute('/api/historial_orden', historial_orden_1.default);
this.configureRoute('/api/historial_servicio_orden', routerHistorialServicioOrden);
this.configureRoute('/api/login', login_1.default);
this.configureRoute('/api/marca', routerMarca);
this.configureRoute('/api/orden_trabajo', orden_trabajo_1.default);
this.configureRoute('/api/servicio', servicio_1.default);
this.configureRoute('/api/servicio_orden', servicio_orden_1.default);
this.configureRoute('/api/trabajador', trabajador_1.default);
this.configureRoute('/api/trabajador_rol', trabajador_rol_1.default);
configureRoute(path, string, router, any);
{
    this.app.use(path, (req, res, next) => {
        if (req.method === 'GET') {
            console.log(`Acceso a ${path.replace('/api/', '')}`);
        }
        next();
    }, router);
}
async;
dbConnect();
{
    try {
        // Conexión a la base de datos
        console.log('Base de datos conectada');
        // Sincronizar modelos con la base de datos
        // await db.sync({ force: false }); // force: true solo en desarrollo
    }
    catch (error) {
        console.log('Error al conectarse a la base de datos:', error);
    }
}
listen();
{
    this.app.listen(this.port, () => {
        console.log(`Servidor corriendo en puerto ${this.port}`);
    });
}
exports.default = Server;
