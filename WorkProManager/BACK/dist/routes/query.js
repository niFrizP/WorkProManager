"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// WorkProManager/BACK/src/routes/order.ts
const express_1 = require("express");
const query_1 = require("../controllers/query");
const router = (0, express_1.Router)();
router.get('/', query_1.getOrdersByEstado); // Ruta para obtener las órdenes con joins
router.get('/estadoot', query_1.getOrdersEstadoSum); // Ruta para obtener las órdenes con joins
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
