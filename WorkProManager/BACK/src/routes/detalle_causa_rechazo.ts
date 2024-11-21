import { Router } from 'express';
import { 
    getDetallesOt,
    getDetalleOt,
    postDetalleOt,
    updateDetalleOt,
    deleteDetalleOt,
    getDetallesByOT,
    countDetallesByRechazo
    
} from '../controllers/detalle_causa_rechazo';

const router = Router();

router.get('/', getDetallesOt);
router.get('/rechazo/:id_rechazo', countDetallesByRechazo);
router.get('/:id_ot/:id_rechazo', getDetalleOt);
router.post('/', postDetalleOt);
router.put('/:id_ot/:id_rechazo', updateDetalleOt);
router.delete('/:id_ot/:id_rechazo', deleteDetalleOt);
router.get('/:id_ot', getDetallesByOT);

export default router;
