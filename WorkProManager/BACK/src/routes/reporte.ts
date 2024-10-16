import { Router, Request, Response, NextFunction } from 'express';
// Ensure the path and file name are correct
import { postReporte, getReportes, getReporte, deleteReporte, updateReporte} from '../controllers/reporte';

const router = Router();

router.post('/', postReporte);
router.get('/', getReportes);
router.get('/:id', getReporte);
router.delete('/:id', deleteReporte);
router.put('/:id', updateReporte);


export default router;


