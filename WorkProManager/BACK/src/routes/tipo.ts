import { Router } from 'express';
import { getTipos, getTipo, postTipo, updateTipo, deleteTipo } from '../controllers/tipo';

const router = Router();

router.get('/', getTipos);
router.get('/:id', getTipo);
router.post('/', postTipo);
router.put('/:id', updateTipo);
router.delete('/:id', deleteTipo);

export default router;