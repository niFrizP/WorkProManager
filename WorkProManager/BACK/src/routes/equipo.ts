import { Router } from 'express';
import { getEquipo, getEquipos, updateEquipo, deleteEquipo, postEquipo } from '../controllers/equipo';

const router = Router();

router.get('/', getEquipos);

router.get('/:id', getEquipo);

router.delete('/:id', deleteEquipo);
router.post('/', postEquipo);
router.put('/:id', updateEquipo);

export default router;
