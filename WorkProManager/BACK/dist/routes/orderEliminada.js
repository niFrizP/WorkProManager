"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// WorkProManager/BACK/src/routes/order.ts
const express_1 = require("express");
const order_eliminada_1 = require("../controllers/order_eliminada");
const router = (0, express_1.Router)();
router.get('/', order_eliminada_1.getOrders); // Ruta para obtener las órdenes con joins
router.get('/:id', order_eliminada_1.getOrder); // Para obtener una orden específica por ID
router.post('/', order_eliminada_1.postOrder); // Para crear una nueva orden
router.put('/:id', order_eliminada_1.updateOrder); // Para actualizar una orden por ID
router.delete('/:id', order_eliminada_1.deleteOrder); // Para eliminar una orden por ID
exports.default = router;
