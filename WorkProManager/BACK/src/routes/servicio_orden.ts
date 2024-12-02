import { Router, RequestHandler } from 'express';
import {
    getServiciosOrdenPorIdOT,
    eliminarServicioOrden
} from '../controllers/servicio_orden';
import { validateToken } from './validar_token';

const router = Router();

router.get('/:id_ot',validateToken, getServiciosOrdenPorIdOT as RequestHandler);

router.delete('/:id_ot/:id_serv',validateToken, eliminarServicioOrden as RequestHandler);

export default router; 