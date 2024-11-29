"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cliente_1 = __importDefault(require("../routes/cliente"));
const trabajador_1 = __importDefault(require("../routes/trabajador"));
const servicio_1 = __importDefault(require("../routes/servicio"));
const estado_ot_1 = __importDefault(require("../routes/estado_ot"));
const equipo_1 = __importDefault(require("../routes/equipo"));
const trabajador_rol_1 = __importDefault(require("../routes/trabajador_rol"));
const login_1 = __importDefault(require("../routes/login"));
const accion_1 = __importDefault(require("../routes/accion"));
const asignacion_1 = __importDefault(require("../routes/asignacion"));
const historial_orden_1 = __importDefault(require("../routes/historial_orden"));
const orden_trabajo_1 = __importDefault(require("../routes/orden_trabajo"));
const servicio_orden_1 = __importDefault(require("../routes/servicio_orden"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connection_1 = __importDefault(require("../db/connection")); // Asegúrate de que aquí importas initModels
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, cors_1.default)({
            origin: ['http://localhost:4200', 'http://localhost:54351'], // Dirección del frontend
            credentials: true // Permite el envío de cookies
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
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'API Working'
            });
        });
        this.app.use('/api/accion', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a login');
            }
            next();
        }, accion_1.default);
        this.app.use('/api/asignacion', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a login');
            }
            next();
        }, asignacion_1.default);
        this.app.use('/api/cliente', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a login');
            }
            next();
        }, cliente_1.default);
        this.app.use('/api/login', (req, res, next) => {
            if (req.method === 'POST') {
                console.log('Acceso a login');
            }
            next();
        }, login_1.default);
        this.app.use('/api/clientes', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a clientes');
            }
            next();
        }, cliente_1.default);
        //this.app.use('/api/ordersCountByService', (req: Request, res: Response, next: Function) => {
        //if (req.method === 'GET') {
        //console.log('Acceso a órdenes');
        //}
        //next();
        //}, ordersCountByService);
        this.app.use('/api/trabajador', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a trabajadores');
            }
            next();
        }, trabajador_1.default);
        this.app.use('/api/servicio', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a servicios');
            }
            next();
        }, servicio_1.default);
        this.app.use('/api/estado_ot', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a estado de órdenes de trabajo');
            }
            next();
        }, estado_ot_1.default);
        this.app.use('/api/equipo', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a equipos');
            }
            next();
        }, equipo_1.default);
        this.app.use('/api/trabajador_rol', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a roles');
            }
            next();
        }, trabajador_rol_1.default);
        this.app.use('/api/historial_orden', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso al historial de órdenes');
            }
            next();
        }, historial_orden_1.default);
        this.app.use('/api/orden_trabajo', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a órdenes de trabajo');
            }
            next();
        }, orden_trabajo_1.default);
        this.app.use('/api/servicio_orden', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a servicios de órdenes');
            }
            next();
        }, servicio_orden_1.default);
    }
    middlewares() {
        this.app.use((0, cors_1.default)({ origin: "http://localhost:4200", credentials: true
        }));
        this.app.use(express_1.default.json());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Base de datos conectada');
                // Inicializar los modelos después de conectar a la base de datos
            }
            catch (error) {
                console.log('Error al conectarse a la base de datos:', error);
            }
        });
    }
}
exports.default = Server;
