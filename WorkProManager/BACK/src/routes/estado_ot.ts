import { Router, RequestHandler } from 'express';
import { 
    getEstadosOT, 
    getEstadoOTById,
    createEstadoOT,
    updateEstadoOT, 
    deleteEstadoOT 
} from '../controllers/estado_ot';

const router = Router();

router.get('/', getEstadosOT);
router.get('/:id', getEstadoOTById);
router.post('/', createEstadoOT);
router.put('/:id', updateEstadoOT);
router.delete('/:id', deleteEstadoOT);

export default router; 