import { Router, RequestHandler } from 'express';
import { 
    getTrabajadores, 
    getTrabajador, 
    updateTrabajador, 
    deleteTrabajador,
    postTrabajador
} from '../controllers/trabajador';

const router = Router();

router.get('/', getTrabajadores as RequestHandler);
router.get('/:id', getTrabajador as RequestHandler);
router.post('/', postTrabajador as RequestHandler);
router.put('/:id', updateTrabajador as RequestHandler);
router.delete('/:id', deleteTrabajador as RequestHandler);

export default router;