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
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
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
        // Parseo body
        // Configuración de CORS
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:4200', // Reemplaza con la URL de tu frontend
            credentials: true, // Permitir el envío de cookies y encabezados de autorización
        }));
        // Analizar cookies
        this.app.use((0, cookie_parser_1.default)()); // <--- Aquí
        // Parseo del body
        this.app.use(express_1.default.json());
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
}
exports.default = Server;
