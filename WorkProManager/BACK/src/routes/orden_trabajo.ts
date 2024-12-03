import { Router, RequestHandler } from 'express';
import {
    getOrdenConTrabajadorPorIDOTValidados,
    getOrdenesConTrabajadoresValidados
} from '../controllers/orden_trabajo';
import { validateToken } from './validar_token';

const router = Router();

router.get('/:id',validateToken, getOrdenConTrabajadorPorIDOTValidados as RequestHandler);

router.get('/',validateToken, getOrdenesConTrabajadoresValidados as RequestHandler);

export default router; 