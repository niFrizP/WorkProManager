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
// WorkProManager/BACK/src/routes/order.ts
const express_1 = require("express");
const order_1 = require("../controllers/order");
const connection_1 = __importDefault(require("../db/connection"));
const orders_1 = __importDefault(require("../models/orders"));
const router = (0, express_1.Router)();
router.get('/', order_1.getOrders); // Ruta para obtener todas las ordenes
router.get('/tecnico', order_1.getOrdersByTecnico);
router.get('/vistatecnico', order_1.createLastSolicitudPerOrderView); //crea vista de ultima solicitud por orden
router.get('/completass', order_1.getOrdersCompletadas);
router.post('/reportestecnico', order_1.getOrdersReporteTecnico);
router.get('/rechazadass', order_1.getOrderssEliminadas);
router.get('/count', order_1.createSolicitudView);
//rutas del home grafico
router.get('/count12mesesa', order_1.getOrdersRealizadasCountByMonth);
router.get('/count12meseseliminadas', order_1.getOrdersFinalizadasCountByMonth);
//rutas de solicitudes general
router.get('/countabiertas', order_1.getOrdersCountPorRealizar);
router.get('/countcerradas', order_1.getOrdersCountTerminadas);
//rutas de solicitud por usuario
router.post('/cotizacionesabiertastecnico', order_1.getOrdersCountPorRealizarTecnico);
router.get('/cotizacionesgeneral', order_1.getOrdersCotizacionesGeneral);
router.post('/cotizacionestecnico', order_1.getOrdersCotizacionesTecnico);
router.get('/getOrders1', order_1.getOrders_1);
router.get('/getOrders2', order_1.getOrders_2);
router.get('/getOrders3', order_1.getOrders_3);
router.get('/getOrdersByRutUsuario1', order_1.getOrdersByRutUsuario1);
router.get('/getOrdersByRutUsuario2', order_1.getOrdersByRutUsuario2);
router.get('/getOrdersByRutUsuario3', order_1.getOrdersByRutUsuario3);
router.get('/reportesGeneral', order_1.getOrdersReporteGeneral);
router.get('/solicitudes', order_1.getSolicitudesFromView);
router.get('/countOrderN', order_1.countOrdersNotificationCotizacon); // Para obtener una orden específica por ID
router.get('/countOrderNReportes', order_1.countOrdersNotificationReportes); // Para obtener una orden específica por ID
router.get('/countOrderNFinalizadas', order_1.countOrdersNotificationFinalizada); // Para obtener una orden específica por ID
router.get('/countOrderNRechazadas', order_1.countOrdersNotificationRechazadas); // Para obtener una orden específica por ID
router.post('/countOrderNReportesByRut', order_1.countOrdersNotificationReportesByRut);
router.post('/countOrderNCotizacionesByRut', order_1.countOrdersNotificationCotizacionesByRut);
router.get('/eliminadas', order_1.getOrdersEliminadas);
router.get('/:id', order_1.getOrder); // Para obtener una orden específica por ID
router.put('/:id', order_1.updateOrder); // Para actualizar una orden por ID
router.post('/', order_1.postOrder); // Para crear una nueva orden
router.delete('/:id', order_1.deleteOrder); // Para eliminar una orden por ID
router.get('/count-by-status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: ['estado', [connection_1.default.fn('COUNT', connection_1.default.col('id')), 'total']], // Contar el número de órdenes por estado
            group: ['estado'], // Agrupar por el campo 'estado'
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
}));
router.get('/ordersByUsuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersByUsuario = yield orders_1.default.findAll({
            attributes: ['rut_usuario', [connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número de órdenes por usuario
            group: ['rut_usuario'], // Agrupar por el campo 'rut_usuario'
        });
        res.json(ordersByUsuario);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
}));
// Ejemplo de contar órdenes por servicio
router.get('/count-by-service', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCountByService = yield orders_1.default.findAll({
            attributes: ['servicio_id', [connection_1.default.fn('COUNT', connection_1.default.col('id')), 'total']], // Contar el número de órdenes por servicio
            group: ['servicio_id'], // Agrupar por el campo 'servicio_id'
        });
        res.json(ordersCountByService);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
}));
exports.default = router;
