import { Router } from 'express';
import { getRol, getRoles, updateRol, deleteRol, postRol } from '../controllers/rol';

const router = Router();

router.get('/', getRoles);
router.get('/:id', getRol);
router.delete('/:id', deleteRol);
router.post('/', postRol);
router.put('/:id', updateRol);

export default router;
