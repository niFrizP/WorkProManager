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
const order_1 = __importDefault(require("../routes/order"));
const cliente_1 = __importDefault(require("../routes/cliente"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const servicio_1 = __importDefault(require("../routes/servicio"));
const estado_ot_1 = __importDefault(require("../routes/estado_ot"));
const equipo_1 = __importDefault(require("../routes/equipo"));
const rol_1 = __importDefault(require("../routes/rol"));
const log_1 = __importDefault(require("../routes/log"));
const pago_1 = __importDefault(require("../routes/pago"));
const marca_1 = __importDefault(require("../routes/marca"));
const usuario_eliminado_1 = __importDefault(require("../routes/usuario_eliminado"));
const order_2 = __importDefault(require("../routes/order"));
const query_1 = __importDefault(require("../routes/query"));
const tipo_1 = __importDefault(require("../routes/tipo"));
const connection_1 = __importDefault(require("../db/connection")); // Asegúrate de que aquí importas initModels
class Server {
    constructor() {
        this.app = (0, express_1.default)();
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
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'API Working'
            });
        });
        this.app.use('/api/query', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a consultas');
            }
            next();
        }, query_1.default);
        this.app.use('/api/clientes', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a clientes');
            }
            next();
        }, cliente_1.default);
        this.app.use('/api/orders', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a órdenes');
            }
            next();
        }, order_1.default);
        this.app.use('/api/ordersCountByService', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a órdenes');
            }
            next();
        }, order_2.default);
        this.app.use('/api/usuario', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a usuarios');
            }
            next();
        }, usuario_1.default);
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
        this.app.use('/api/tipo', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a tipos');
            }
            next();
        }, tipo_1.default);
        this.app.use('/api/equipo', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a equipos');
            }
            next();
        }, equipo_1.default);
        this.app.use('/api/rol', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a roles');
            }
            next();
        }, rol_1.default);
        this.app.use('/api/log', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a logs');
            }
            next();
        }, log_1.default);
        this.app.use('/api/pago', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a pagos');
            }
            next();
        }, pago_1.default);
        this.app.use('/api/marca', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a marcas');
            }
            next();
        }, marca_1.default);
        this.app.use('/api/usuarioEliminado', (req, res, next) => {
            if (req.method === 'GET') {
                console.log('Acceso a usuarios eliminados');
            }
            next();
        }, usuario_eliminado_1.default);
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
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
