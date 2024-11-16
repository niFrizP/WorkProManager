"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// WorkProManager/BACK/src/routes/order.ts
const express_1 = require("express");
const query_1 = require("../controllers/query");
const order_1 = require("../controllers/order");
const router = (0, express_1.Router)();
router.post('/getorderbyid', order_1.getOrdersByUsuarioOrder); // Ruta para obtener las órdenes con joins
router.get('/grafico', query_1.getOrdersByEstadoEnTiempoGrafico); // Ruta para obtener las órdenes con joins
router.post('/getUser1', query_1.getOrdersByEstadoByUser_1);
router.post('/getorderbyidenproceso', order_1.getOrdersByUsuarioOrderEnProceso); // Ruta para obtener las órdenes con joins
router.post('/getUser2', query_1.getOrdersByEstadoByUser_2);
router.post('/getUser3', query_1.getOrdersByEstadoByUser_3);
router.post('/getUser4', query_1.getOrdersByEstadoByUser_4);
router.post('/getUser5', query_1.getOrdersByEstadoByUser_5);
router.post('/orderValidasEnTiempo', query_1.getOrdersByEstadoEnTiempo);
router.post('/orderTotalValidasEnTiempo', query_1.getOrdersByEstadoTotalEnTiempo); // Ruta para obtener las órdenes con joins
router.post('/', query_1.getOrdersByEstadoTotal); // Ruta para obtener las órdenes con joins
router.post('/orderActivas', query_1.getOrdersByEstado); // Ruta para obtener las órdenes con joins
router.post('/orderEliminadas', query_1.getOrdersByEstadoEliminada); // Ruta para obtener las órdenes con joins
router.post('/orderTotalByUsuario', query_1.getOrdersByEstadoTotalByUser); // Ruta para obtener las órdenes con joins
router.post('/orderEliminadaByUsuario', query_1.getOrdersByEstadoEliminadaByUser); // Ruta para obtener las órdenes con joins
router.post('/orderByUsuario', query_1.getOrdersByEstadoByUser); // Ruta para obtener las órdenes con joins
router.get('/usuario', query_1.getOrdersByUsuario); // Ruta para obtener las órdenes con joins
router.get('/costo', query_1.getOrdersEstadoSum); // Ruta para obtener las órdenes con joins
router.get('/dia', query_1.countOrdersByDate); // Ruta para obtener las órdenes con joins
router.get('/fecha', query_1.getOrdersByFecha); // Ruta para obtener las órdenes con joins
router.get('/mesanio', query_1.getOrdersByMonthAndYear); // Ruta para obtener las órdenes con joins
router.get('/ultimos7dias', query_1.getOrdersFromLast7DaysExcludingWeekends); // Ruta para obtener las órdenes con joins
router.get('/anio', query_1.getOrdersByYear); // Ruta para obtener las órdenes con joins
router.get('/:id', query_1.getOrder); // Para obtener una orden específica por ID
router.post('/', query_1.postOrder); // Para crear una nueva orden
router.put('/:id', query_1.updateOrder); // Para actualizar una orden por ID
router.delete('/:id', query_1.deleteOrder); // Para eliminar una orden por ID
exports.default = router;
