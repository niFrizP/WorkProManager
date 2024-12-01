import { Router, RequestHandler } from 'express';
import {
    getOrdenesConTrabajadores
} from '../controllers/orden_trabajo';

const router = Router();

router.get('/:id', getOrdenesConTrabajadores);

export default router; 