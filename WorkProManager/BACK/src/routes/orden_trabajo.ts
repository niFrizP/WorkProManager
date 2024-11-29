import { Router, RequestHandler } from 'express';
import {
    getOrdenesTrabajo,
    getOrdenTrabajo,
    postOrdenTrabajo,
    updateOrdenTrabajo
} from '../controllers/orden_trabajo';

const router = Router();

router.get('/', getOrdenesTrabajo as RequestHandler);
router.get('/:id', getOrdenTrabajo as RequestHandler);
router.post('/', postOrdenTrabajo as RequestHandler);
router.put('/:id', updateOrdenTrabajo as RequestHandler);

export default router; 