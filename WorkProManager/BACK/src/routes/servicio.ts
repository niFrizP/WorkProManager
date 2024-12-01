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
router.delete('/:id', deleteServicio);
router.post('/', createServicio);
router.put('/:id', updateServicio);

export default router; 