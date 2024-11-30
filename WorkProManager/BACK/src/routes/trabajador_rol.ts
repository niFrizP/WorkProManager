import { Router, RequestHandler } from 'express';
import {
    getRoles,
    getRol,
    postRol,
    updateRol,
    deleteRol,
    getTrabajadoresPorRol
} from '../controllers/trabajador_rol';

const router = Router();

router.get('/', getRoles as RequestHandler);
router.get('/:id', getRol as RequestHandler);
router.get('/:id/trabajadores', getTrabajadoresPorRol as RequestHandler);
router.post('/', postRol as RequestHandler);
router.put('/:id', updateRol as RequestHandler);
router.delete('/:id', deleteRol as RequestHandler);

export default router; 