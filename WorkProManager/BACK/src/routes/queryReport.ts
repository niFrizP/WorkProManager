import { Router, Request, Response, NextFunction } from 'express';
// Ensure the path and file name are correct
import { postReporte, getReportes, deleteReporte, updateReporte} from '../controllers/queryReport';

const router = Router();

router.post('/', postReporte);
router.get('/', getReportes);
router.get('/:id', getReportes);
router.delete('/:id', deleteReporte);
router.put('/:id', updateReporte);



export default router;


