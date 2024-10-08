import { Router } from 'express';
import { getEstadoOT, getEstadosOT, updateEstadoOT, deleteEstadoOT, postEstadoOT } from '../controllers/estado_ot';

const router = Router();

router.get('/', getEstadosOT);
router.get('/:id', getEstadoOT);
router.delete('/:id', deleteEstadoOT);
router.post('/', postEstadoOT);
router.put('/:id', updateEstadoOT);

export default router;
