import { Router, RequestHandler } from 'express';
import {
    getServiciosOrden,
    getServiciosPorOrden,
    getServicioOrden,
    postServicioOrden,
    updateServicioOrden,
    deleteServicioOrden
} from '../controllers/servicio_orden';

const router = Router();

router.get('/', getServiciosOrden as RequestHandler);
router.get('/orden/:id_ot', getServiciosPorOrden as RequestHandler);
router.get('/:id', getServicioOrden as RequestHandler);
router.post('/', postServicioOrden as RequestHandler);
router.put('/:id', updateServicioOrden as RequestHandler);
router.delete('/:id', deleteServicioOrden as RequestHandler);

export default router; 