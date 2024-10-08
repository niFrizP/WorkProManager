import { Router } from 'express';
import { getServicio, getServicios, updateServicio, deleteServicio, postServicio } from '../controllers/servicio';

const router = Router();

router.get('/', getServicios);
router.get('/:id', getServicio);
router.delete('/:id', deleteServicio);
router.post('/', postServicio);
router.put('/:id', updateServicio);

export default router;
