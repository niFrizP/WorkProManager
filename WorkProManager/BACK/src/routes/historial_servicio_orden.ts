import { Router, RequestHandler } from 'express';
import {
    getHistorialServicios,
    getHistorialServicio,
    getHistorialServicioPorOT,
    postHistorialServicio
} from '../controllers/historial_servicio_orden';

const router = Router();

// Rutas para historial de servicios
router.get('/', getHistorialServicios as RequestHandler);
router.get('/:id', getHistorialServicio as RequestHandler);
router.get('/orden/:id_ot', getHistorialServicioPorOT as RequestHandler);
router.post('/', postHistorialServicio as RequestHandler);

export default router; 