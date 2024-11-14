// WorkProManager/BACK/src/routes/order.ts
import { Router } from 'express';
import {  getOrder,getOrdersCosto,getOrdersByEstadoByUser_1,getOrdersByEstadoByUser_2,getOrdersByEstadoByUser_3,getOrdersByEstadoByUser_4 ,getOrdersEstadoSum, getOrdersByEstadoTotalEnTiempo, getOrdersByEstadoEliminadaByUser,getOrdersByEstadoEnTiempo, getOrdersByEstadoTotalByUser, getOrdersByEstadoByUser, countOrdersByDate,getOrdersByEstadoEliminada, getOrdersByEstado, getOrdersByYear ,getOrdersFromLast7DaysExcludingWeekends ,getOrdersByMonthAndYear ,getOrdersByEstadoByUser_5,getOrdersByUsuario, postOrder, updateOrder, deleteOrder, getOrdersByFecha, getOrdersByEstadoTotal } from '../controllers/query';
import {  getOrdersByUsuarioOrder} from '../controllers/order';
import sequelize from '../db/connection';
import db from '../db/connection';
import Order from '../models/orders';

const router = Router();

router.post('/getorderbyid', getOrdersByUsuarioOrder); // Ruta para obtener las órdenes con joins

router.post('/getUser1', getOrdersByEstadoByUser_1)

router.post('/getUser2', getOrdersByEstadoByUser_2)

router.post('/getUser3', getOrdersByEstadoByUser_3)

router.post('/getUser4', getOrdersByEstadoByUser_4)

router.post('/getUser5', getOrdersByEstadoByUser_5)

router.post('/orderValidasEnTiempo', getOrdersByEstadoEnTiempo)
router.post('/orderTotalValidasEnTiempo', getOrdersByEstadoTotalEnTiempo); // Ruta para obtener las órdenes con joins


router.post('/', getOrdersByEstadoTotal); // Ruta para obtener las órdenes con joins
router.post('/orderActivas', getOrdersByEstado); // Ruta para obtener las órdenes con joins
router.post('/orderEliminadas', getOrdersByEstadoEliminada); // Ruta para obtener las órdenes con joins
router.post('/orderTotalByUsuario', getOrdersByEstadoTotalByUser); // Ruta para obtener las órdenes con joins
router.post('/orderEliminadaByUsuario', getOrdersByEstadoEliminadaByUser); // Ruta para obtener las órdenes con joins
router.post('/orderByUsuario', getOrdersByEstadoByUser); // Ruta para obtener las órdenes con joins
router.get('/usuario', getOrdersByUsuario); // Ruta para obtener las órdenes con joins
router.get('/costo', getOrdersEstadoSum); // Ruta para obtener las órdenes con joins
router.get('/dia', countOrdersByDate); // Ruta para obtener las órdenes con joins
router.get('/fecha', getOrdersByFecha); // Ruta para obtener las órdenes con joins
router.get('/mesanio', getOrdersByMonthAndYear); // Ruta para obtener las órdenes con joins
router.get('/ultimos7dias', getOrdersFromLast7DaysExcludingWeekends); // Ruta para obtener las órdenes con joins
router.get('/anio', getOrdersByYear); // Ruta para obtener las órdenes con joins
router.get('/:id', getOrder); // Para obtener una orden específica por ID
router.post('/', postOrder); // Para crear una nueva orden
router.put('/:id', updateOrder); // Para actualizar una orden por ID
router.delete('/:id', deleteOrder); // Para eliminar una orden por ID


  

export default router;