import { Router } from 'express';
import { 
    getDetallesOt, 
    getDetalleOt, 
    postDetalleOt, 
    updateDetalleOt, 
    deleteDetalleOt,
    getDetallesOtByOT
} from '../controllers/detalle_ot';

const router = Router();

router.get('/', getDetallesOt);
router.get('/:id_ot/:id_serv', getDetalleOt);
router.post('/', postDetalleOt);
router.put('/:id_ot/:id_serv', updateDetalleOt);
router.delete('/:id_ot/:id_serv', deleteDetalleOt);
router.get('/:id_ot', getDetallesOtByOT);

export default router;
