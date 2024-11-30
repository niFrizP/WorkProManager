import { Router } from 'express';
import {
    getServicios,
    getServicioById,
    createServicio,
    updateServicio,
    deleteServicio } from '../controllers/servicio';

const router = Router();

router.get('/', getServicios);
router.get('/:id', getServicioById);
router.post('/', createServicio);
router.put('/:id', updateServicio);
router.delete('/:id', deleteServicio);

export default router;
