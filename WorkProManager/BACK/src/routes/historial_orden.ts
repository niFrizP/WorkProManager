import { Router, RequestHandler } from 'express';
import {
    getHistorialOrdenes,
    getHistorialOrden,
    getHistorialPorOT,
    postHistorialOrden,
    updateHistorialOrden
} from '../controllers/historial_orden';

const router = Router();

router.get('/', getHistorialOrdenes as RequestHandler);
router.get('/:id', getHistorialOrden as RequestHandler);
router.get('/orden/:id_ot', getHistorialPorOT as RequestHandler);
router.post('/', postHistorialOrden as RequestHandler);
router.put('/:id', updateHistorialOrden as RequestHandler);

export default router; 