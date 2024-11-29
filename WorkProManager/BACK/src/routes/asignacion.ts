import { Router, RequestHandler } from 'express';
import { getAsignaciones, getAsignacion, postAsignacion, updateAsignacion, deleteAsignacion } from '../controllers/asignacion';

const router = Router();

router.get('/', getAsignaciones as RequestHandler);
router.get('/:id', getAsignacion as RequestHandler);
router.post('/', postAsignacion as RequestHandler);
router.put('/:id', updateAsignacion as RequestHandler);
router.delete('/:id', deleteAsignacion as RequestHandler);

export default router; 