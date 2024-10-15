// WorkProManager/BACK/src/routes/order.ts
import { Router } from 'express';
import {  getOrder,getOrdersCosto, getOrdersEstadoSum, getOrdersOfTheDay, getOrdersByEstado, getOrdersByYear ,getOrdersFromLast7DaysExcludingWeekends ,getOrdersByMonthAndYear ,getOrdersByUsuario, postOrder, updateOrder, deleteOrder, getOrdersByFecha } from '../controllers/query';
import { Sequelize } from 'sequelize';
import sequelize from '../db/connection';
import db from '../db/connection';
import Order from '../models/orders';

const router = Router();

router.get('/', getOrdersByEstado); // Ruta para obtener las órdenes con joins
router.get('/estadoot', getOrdersEstadoSum); // Ruta para obtener las órdenes con joins
router.get('/usuario', getOrdersByUsuario); // Ruta para obtener las órdenes con joins
router.get('/costo', getOrdersEstadoSum); // Ruta para obtener las órdenes con joins
router.get('/dia', getOrdersOfTheDay); // Ruta para obtener las órdenes con joins
router.get('/fecha', getOrdersByFecha); // Ruta para obtener las órdenes con joins
router.get('/mesanio', getOrdersByMonthAndYear); // Ruta para obtener las órdenes con joins
router.get('/ultimos7dias', getOrdersFromLast7DaysExcludingWeekends); // Ruta para obtener las órdenes con joins
router.get('/anio', getOrdersByYear); // Ruta para obtener las órdenes con joins
router.get('/:id', getOrder); // Para obtener una orden específica por ID
router.post('/', postOrder); // Para crear una nueva orden
router.put('/:id', updateOrder); // Para actualizar una orden por ID
router.delete('/:id', deleteOrder); // Para eliminar una orden por ID


  

export default router;