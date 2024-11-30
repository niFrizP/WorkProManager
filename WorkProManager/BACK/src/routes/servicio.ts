import { Router, RequestHandler } from 'express';
import { getServicios, getServicio, postServicio, updateServicio, deleteServicio } from '../controllers/servicio';

const router = Router();

router.get('/', getServicios as RequestHandler);
router.get('/:id', getServicio as RequestHandler);
router.post('/', postServicio as RequestHandler);
router.put('/:id', updateServicio as RequestHandler);
router.delete('/:id', deleteServicio as RequestHandler);

export default router; 