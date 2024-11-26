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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session")); // Importamos express-session
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv")); // Importación de dotenv
const socket_io_1 = __importDefault(require("socket.io")); // Importación de socket.io
const http_1 = __importDefault(require("http")); // Importación de http
// Importación de rutas
const order_1 = __importDefault(require("../routes/order"));
const cliente_1 = __importDefault(require("../routes/cliente"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const servicio_1 = __importDefault(require("../routes/servicio"));
const estado_ot_1 = __importDefault(require("../routes/estado_ot"));
const equipo_1 = __importDefault(require("../routes/equipo"));
const rol_1 = __importDefault(require("../routes/rol"));
const log_ot_1 = __importDefault(require("../routes/log_ot"));
const marca_1 = __importDefault(require("../routes/marca"));
const detalle_ot_1 = __importDefault(require("../routes/detalle_ot"));
const usuario_eliminado_1 = __importDefault(require("../routes/usuario_eliminado"));
const order_2 = __importDefault(require("../routes/order"));
const query_1 = __importDefault(require("../routes/query"));
const causa_rechazo_1 = __importDefault(require("../routes/causa_rechazo"));
const detalle_causa_rechazo_1 = __importDefault(require("../routes/detalle_causa_rechazo"));
const tipo_1 = __importDefault(require("../routes/tipo"));
const login_1 = __importDefault(require("../routes/login"));
const solicitud_1 = __importDefault(require("../routes/solicitud"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        // Carga las variables de entorno
        dotenv_1.default.config();
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001'; // Puerto por defecto
        this.middlewares(); // Configuración de middlewares
        this.routes(); // Configuración de rutas
        this.dbConnect(); // Conexión a la base de datos
        this.listen(); // Iniciar el servidor
        this.role = this.assignRole(this.port); // Asignar rol al servidor según el puerto
        this.httpServer = new http_1.default.Server(this.app);
        this.io = new socket_io_1.default.Server(this.httpServer);
        this.configureSockets(); // Configurar sockets
    }
    /**
     * Configura los sockets para el servidor.
     */
    configureSockets() {
        this.io.on('connection', (socket) => {
            console.log('Cliente conectado');
            socket.on('Tarea Asignada:', (data) => {
                console.log('Tarea asignada:', data);
                this.io.emit('Tarea-actualizada:', data);
            });
            socket.on('disconnect', () => {
                console.log('Cliente desconectado');
            });
        });
    }
    /**
     * Inicia el servidor en el puerto especificado.
     */
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`);
        });
    }
    /**
     * Asigna un rol a la aplicación según el puerto.
     */
    assignRole(port) {
        if (port === '3001') {
            console.log('Servidor de admin');
            return 'admin';
        }
        else if (port === '3002') {
            console.log('Servidor de técnico');
            return 'tecnico';
        }
        else if (port === '3003') {
            console.log('Servidor de gestor');
            return 'gestor';
        }
        return 'default';
    }
    /**
     * Configuración de rutas de la aplicación.
     */
    routes() {
        // Ruta raíz
        this.app.get('/', (req, res) => {
            res.json({ msg: 'API Funcionando' });
        });
        // Ruta para obtener el rol del servidor
        this.app.get('');
        // Definición de todas las rutas
        const routes = [
            { path: '/api/causa', handler: causa_rechazo_1.default },
            { path: '/api/detallecausa', handler: detalle_causa_rechazo_1.default },
            { path: '/api/login', handler: login_1.default },
            { path: '/api/solicitud', handler: solicitud_1.default },
            { path: '/api/detalle_ot', handler: detalle_ot_1.default },
            { path: '/api/log_ot', handler: log_ot_1.default },
            { path: '/api/query', handler: query_1.default },
            { path: '/api/clientes', handler: cliente_1.default },
            { path: '/api/orders', handler: order_1.default },
            { path: '/api/ordersCountByService', handler: order_2.default },
            { path: '/api/usuario', handler: usuario_1.default },
            { path: '/api/servicio', handler: servicio_1.default },
            { path: '/api/estado_ot', handler: estado_ot_1.default },
            { path: '/api/tipo', handler: tipo_1.default },
            { path: '/api/equipo', handler: equipo_1.default },
            { path: '/api/rol', handler: rol_1.default },
            { path: '/api/log', handler: log_ot_1.default },
            { path: '/api/marca', handler: marca_1.default },
            { path: '/api/usuarioEliminado', handler: usuario_eliminado_1.default }
        ];
        // Asignar rutas dinámicamente y loguear acceso
        routes.forEach(route => {
            this.app.use(route.path, (req, res, next) => {
                if (req.method === 'GET') {
                    console.log(`Acceso a ${route.path}`);
                }
                next();
            }, route.handler);
        });
    }
    /**
     * Configuración de middlewares de la aplicación.
     */
    middlewares() {
        // Middleware para cookies
        this.app.use((0, cookie_parser_1.default)());
        // Middleware para sesiones
        this.app.use((0, express_session_1.default)({
            name: 'sessionId',
            secret: 'superSecretKey',
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: process.env.NODE_ENV === 'production', // Solo se envía si es HTTPS
                httpOnly: true, // La cookie no puede ser leída por JavaScript
                maxAge: 1000 * 60 * 60 * 24 // 1 día
            }
        }));
        // Middleware para gestionar orígenes con CORS
        const allowedOrigins = [
            'http://localhost:4200',
            'http://localhost:54351',
            'http://localhost:8080',
            'http://localhost:8100',
            process.env.CLIENT_URL || ''
        ];
        this.app.use((0, cors_1.default)({
            origin: (origin, callback) => {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                }
                else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true
        }));
        // Middleware para parsear JSON y URL-encoded
        this.app.use(express_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    /**
     * Conexión a la base de datos y autenticación.
     */
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Base de datos conectada');
                // Inicializar los modelos después de conectar a la base de datos (si aplica)
            }
            catch (error) {
                console.error('Error al conectarse a la base de datos:', error);
            }
        });
    }
}
exports.default = Server;
