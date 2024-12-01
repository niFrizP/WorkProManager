import { Router, RequestHandler } from 'express';
import { 
    getEstadosOT, 
    getEstadoOT, 
    postEstadoOT, 
    updateEstadoOT, 
    deleteEstadoOT 
} from '../controllers/estado_ot';

const router = Router();

router.get('/', getEstadosOT as RequestHandler);
router.get('/:id', getEstadoOT as RequestHandler);
router.post('/', postEstadoOT as RequestHandler);
router.put('/:id', updateEstadoOT as RequestHandler);
router.delete('/:id', deleteEstadoOT as RequestHandler);

export default router; 