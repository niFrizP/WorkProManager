import { Router } from 'express';
import {
    getServicios,
    getServicioById,
    createServicio,
    updateServicio,
    deleteServicio } from '../controllers/servicio';

const router = Router();

router.get('/', getServicios);
router.get('/:id', getServicio);
router.delete('/:id', deleteServicio);
router.post('/', postServicio);
router.put('/:id', updateServicio);

export default router; 