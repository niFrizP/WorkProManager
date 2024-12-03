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
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const lusca_1 = __importDefault(require("lusca")); // Importa lusca
const express_session_1 = __importDefault(require("express-session"));
const trabajador_1 = __importDefault(require("../routes/trabajador"));
const insertarCotizacion_1 = __importDefault(require("../routes/insertarCotizacion"));
const servicio_1 = __importDefault(require("../routes/servicio"));
const marca_1 = __importDefault(require("../routes/marca"));
const equipo_1 = __importDefault(require("../routes/equipo"));
const insertar_servicio_orden_1 = __importDefault(require("../routes/insertar_servicio_orden"));
const estado_ot_1 = __importDefault(require("../routes/estado_ot"));
const orden_trabajo_1 = __importDefault(require("../routes/orden_trabajo"));
const servicio_orden_1 = __importDefault(require("../routes/servicio_orden"));
// Importar los modelos
const trabajador_2 = __importDefault(require("./trabajador"));
const trabajador_rol_1 = __importDefault(require("./trabajador_rol"));
const asignacion_1 = __importDefault(require("./asignacion"));
const cliente_1 = __importDefault(require("./cliente"));
const marca_2 = __importDefault(require("./marca"));
const equipo_2 = __importDefault(require("./equipo"));
const estado_ot_2 = __importDefault(require("./estado_ot"));
const servicio_2 = __importDefault(require("./servicio"));
const orden_trabajo_2 = __importDefault(require("./orden_trabajo"));
const servicio_orden_2 = __importDefault(require("./servicio_orden"));
const historial_orden_1 = __importDefault(require("./historial_orden"));
const historial_servicio_orden_1 = __importDefault(require("./historial_servicio_orden"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const servicio_orden_3 = require("../controllers/servicio_orden"); // Importa las funciones auxiliares
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        // Configurar el servidor HTTP para usar con Socket.IO
        this.server = http_1.default.createServer(this.app);
        this.io = new socket_io_1.default.Server(this.server, {
            cors: {
                origin: 'http://localhost:4200', // Asegúrate de permitir el frontend Angular
                methods: ['GET', 'POST'],
                credentials: true,
            }
        });
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
        // Configurar eventos de Socket.IO
        this.socketEvents();
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/trabajador', trabajador_1.default);
        this.app.use('/api/cotizacion', insertarCotizacion_1.default);
        this.app.use('/api/servicio', servicio_1.default);
        this.app.use('/api/marca', marca_1.default);
        this.app.use('/api/equipo', equipo_1.default);
        this.app.use('/api/servicio-orden', insertar_servicio_orden_1.default);
        this.app.use('/api/estado-ot', estado_ot_1.default);
        this.app.use('/api/orden', orden_trabajo_1.default);
        this.app.use('/api/get-servicio-orden', servicio_orden_1.default);
    }
    midlewares() {
        // Configuración de CORS
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:3001', // Reemplaza con la URL de tu frontend
            credentials: true, // Permitir el envío de cookies y encabezados de autorización
        }));
        // Parseo del body
        this.app.use(express_1.default.json());
        // Analizar cookies
        this.app.use((0, cookie_parser_1.default)());
        // Configurar sesión (debe ir antes de lusca)
        this.app.use((0, express_session_1.default)({
            secret: '123', // Cambia esto por una clave secreta segura
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true
            }
        }));
        // Opción 1: Deshabilitar CSRF temporalmente y mantener otras protecciones
        this.app.use((0, lusca_1.default)({
            xframe: 'SAMEORIGIN',
            xssProtection: true
        }));
        // Opción 2: O si prefieres mantener CSRF pero con configuración más permisiva
        /*
        this.app.use(lusca({
            csrf: {
                angular: true // Esto es específico para aplicaciones Angular
            },
            xframe: 'SAMEORIGIN',
            xssProtection: true
        }));
        */
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield trabajador_2.default.sync();
                yield trabajador_rol_1.default.sync();
                yield asignacion_1.default.sync();
                yield cliente_1.default.sync();
                yield marca_2.default.sync();
                yield equipo_2.default.sync();
                yield estado_ot_2.default.sync();
                yield servicio_2.default.sync();
                yield orden_trabajo_2.default.sync();
                yield servicio_orden_2.default.sync();
                yield historial_orden_1.default.sync();
                yield historial_servicio_orden_1.default.sync();
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
    socketEvents() {
        this.io.on('connection', (socket) => {
            console.log('Un cliente se ha conectado', socket.id);
            // Enviar un mensaje de bienvenida al cliente
            socket.emit('mensaje', '¡Hola desde el servidor!');
            // Recibir mensaje desde el cliente
            socket.on('mensajeCliente', (data) => {
                console.log('Mensaje recibido del cliente:', data);
            });
            // Evento para obtener servicios habilitados
            socket.on('getServiciosHabilitados', (id_ot) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const serviciosHabilitados = yield (0, servicio_orden_3.fetchServiciosHabilitados)(id_ot);
                    if (!serviciosHabilitados || serviciosHabilitados.length === 0) {
                        socket.emit('serviciosHabilitados', { msg: 'No se encontraron servicios habilitados para esta orden.' });
                    }
                    else {
                        socket.emit('serviciosHabilitados', serviciosHabilitados);
                    }
                }
                catch (error) {
                    socket.emit('error', 'Hubo un problema al obtener los servicios habilitados');
                    console.error(error);
                }
            }));
            // Evento para obtener servicios deshabilitados
            socket.on('getServiciosDeshabilitados', (id_ot) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const serviciosDeshabilitados = yield (0, servicio_orden_3.fetchServiciosDeshabilitados)(id_ot);
                    if (!serviciosDeshabilitados || serviciosDeshabilitados.length === 0) {
                        socket.emit('serviciosDeshabilitados', { msg: 'No se encontraron servicios deshabilitados para esta orden.' });
                    }
                    else {
                        socket.emit('serviciosDeshabilitados', serviciosDeshabilitados);
                    }
                }
                catch (error) {
                    socket.emit('error', 'Hubo un problema al obtener los servicios deshabilitados');
                    console.error(error);
                }
            }));
            // Evento cuando un cliente se desconecta
            socket.on('disconnect', () => {
                console.log('Un cliente se ha desconectado', socket.id);
            });
        });
    }
}
exports.default = Server;
