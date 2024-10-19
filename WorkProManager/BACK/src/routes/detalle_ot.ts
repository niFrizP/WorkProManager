import { Router } from 'express';
import { 
    getDetallesOt, 
    getDetalleOt, 
    postDetalleOt, 
    updateDetalleOt, 
    deleteDetalleOt 
} from '../controllers/detalle_ot';

const router = Router();

router.get('/', getDetallesOt);
router.get('/:id_ot/:id_serv', getDetalleOt);
router.post('/', postDetalleOt);
router.put('/:id_ot/:id_serv', updateDetalleOt);
router.delete('/:id_ot/:id_serv', deleteDetalleOt);

export default router;
