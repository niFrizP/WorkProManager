import { Router, RequestHandler } from 'express';
import { 
    getEquipos, 
    getEquipo, 
    postEquipo, 
    updateEquipo, 
    deleteEquipo 
} from '../controllers/equipo';

const router = Router();

router.get('/', getEquipos as RequestHandler);
router.get('/:id', getEquipo as RequestHandler);
router.post('/', postEquipo as RequestHandler);
router.put('/:id', updateEquipo as RequestHandler);
router.delete('/:id', deleteEquipo as RequestHandler);

export default router; 