import { Router } from 'express';
import { getPagos, getPago, updatePago, deletePago, postPago } from '../controllers/pago';

const router = Router();

router.get('/', getPagos);
router.get('/:id', getPago);
router.delete('/:id', deletePago);
router.post('/', postPago);
router.put('/:id', updatePago);

export default router;
