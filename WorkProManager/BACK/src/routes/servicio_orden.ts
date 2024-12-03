import { Router, RequestHandler } from 'express';
import {
    getServiciosOrdenPorIdOT,
    eliminarServicioOrden,
    activarServicioOrden, 
    desactivarServicioOrden,

    getServiciosDeshabilitados,
    getServiciosHabilitados,
    updateServicioOrden
} from '../controllers/servicio_orden';
import { validateToken } from './validar_token';

const router = Router();

router.put(':/id_ot/:id_serv',validateToken,updateServicioOrden  as RequestHandler);

router.put('/desc/:id_ot/:id_serv',validateToken, desactivarServicioOrden as RequestHandler);
router.put('/act/:id_ot/:id_serv',validateToken, activarServicioOrden as RequestHandler);



router.get('/hab/:id_ot',validateToken, getServiciosHabilitados as RequestHandler);
router.get('/des/:id_ot',validateToken, getServiciosDeshabilitados as RequestHandler);

router.get('/:id_ot',validateToken, getServiciosOrdenPorIdOT as RequestHandler);
router.delete('/:id_ot/:id_serv',validateToken, eliminarServicioOrden as RequestHandler);










export default router; 