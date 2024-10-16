// WorkProManager/BACK/src/routes/order.ts
import { Router } from 'express';
import {  getOrder, getOrders, postOrder, updateOrder, deleteOrder} from '../controllers/order_eliminada';

const router = Router();

router.get('/', getOrders); // Ruta para obtener las órdenes con joins
router.get('/:id', getOrder); // Para obtener una orden específica por ID
router.post('/', postOrder); // Para crear una nueva orden
router.put('/:id', updateOrder); // Para actualizar una orden por ID
router.delete('/:id', deleteOrder); // Para eliminar una orden por ID

export default router;