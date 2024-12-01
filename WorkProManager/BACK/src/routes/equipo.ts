import { Router } from 'express';
import {
    getEquipos,
    getEquipoByNumSer,
    createEquipo,
    updateEquipo,
    deleteEquipo,
} from '../controllers/equipo';

const router = Router();

router.get('/', getEquipos);
router.get('/:num_ser', getEquipoByNumSer);
router.post('/', createEquipo);
router.put('/:num_ser', updateEquipo);
router.delete('/:num_ser', deleteEquipo);

export default router;
