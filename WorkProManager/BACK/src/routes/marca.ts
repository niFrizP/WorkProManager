import { Router } from 'express';
import { getMarcas, getMarca, updateMarca, deleteMarca, postMarca } from '../controllers/marca';

const router = Router();

router.get('/', getMarcas);
router.get('/:id', getMarca);
router.delete('/:id', deleteMarca);
router.post('/', postMarca);
router.put('/:id', updateMarca);

export default router;
