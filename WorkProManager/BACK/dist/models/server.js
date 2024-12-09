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
const socket_io_1 = require("socket.io");
const lusca_1 = __importDefault(require("lusca"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Rutas
const trabajador_1 = __importDefault(require("../routes/trabajador"));
const insertarCotizacion_1 = __importDefault(require("../routes/insertarCotizacion"));
const servicio_1 = __importDefault(require("../routes/servicio"));
const marca_1 = __importDefault(require("../routes/marca"));
const equipo_1 = __importDefault(require("../routes/equipo"));
const insertar_servicio_orden_1 = __importDefault(require("../routes/insertar_servicio_orden"));
const estado_ot_1 = __importDefault(require("../routes/estado_ot"));
const orden_trabajo_1 = __importDefault(require("../routes/orden_trabajo"));
const servicio_orden_1 = __importDefault(require("../routes/servicio_orden"));
// Modelos
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
// Controladores
const servicio_orden_3 = require("../controllers/servicio_orden");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        // Configuración de HTTP y Socket.IO
        this.server = http_1.default.createServer(this.app);
        this.io = new socket_io_1.Server(this.server, {
            cors: {
                origin: 'http://localhost:4200', // Frontend Angular
                methods: ['GET', 'POST'],
                credentials: true,
            }
        });
        this.config();
        this.listen();
        this.routes();
        this.dbConnect();
        this.socketEvents();
    }
    // Configurar middlewares esenciales
    config() {
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:4200', // Reemplazar con la URL de tu frontend
            credentials: true,
        }));
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        // Configurar sesiones
        this.app.use((0, express_session_1.default)({
            secret: process.env.SECRET_KEY || 'default-secret', // Usa una variable de entorno más segura
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
            }
        }));
        // Protección con Lusca para medidas de seguridad básicas
        this.app.use((0, lusca_1.default)({
            xframe: 'SAMEORIGIN',
            xssProtection: true
        }));
    }
    // Configurar las rutas
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
        this.app.use('/api/reset-password', trabajador_1.default);
    }
    // Iniciar el servidor
    listen() {
        this.server.listen(this.port, () => {
            console.log('Aplicación corriendo en el puerto ' + this.port);
        });
    }
    // Conectar a la base de datos y sincronizar los modelos
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Promise.all([
                    trabajador_2.default.sync(),
                    trabajador_rol_1.default.sync(),
                    asignacion_1.default.sync(),
                    cliente_1.default.sync(),
                    marca_2.default.sync(),
                    equipo_2.default.sync(),
                    estado_ot_2.default.sync(),
                    servicio_2.default.sync(),
                    orden_trabajo_2.default.sync(),
                    servicio_orden_2.default.sync(),
                    historial_orden_1.default.sync(),
                    historial_servicio_orden_1.default.sync()
                ]);
                console.log('Conexión a la base de datos exitosa');
            }
            catch (error) {
                console.error('Error al conectar a la base de datos:', error);
            }
        });
    }
    // Eventos de Socket.IO
    socketEvents() {
        this.io.on('connection', (socket) => {
            console.log('Un cliente se ha conectado', socket.id);
            // Evento de bienvenida
            socket.emit('mensaje', '¡Hola desde el servidor!');
            // Escuchar mensaje desde el cliente
            socket.on('mensajeCliente', (data) => {
                console.log('Mensaje recibido del cliente:', data);
            });
            // Obtener servicios habilitados para una orden específica
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
            // Obtener servicios deshabilitados para una orden específica
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
            // Desconexión del cliente
            socket.on('disconnect', () => {
                console.log('Un cliente se ha desconectado', socket.id);
            });
        });
    }
}
exports.default = Server;
