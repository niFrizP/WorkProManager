import { Router, RequestHandler } from 'express';
import { getMarcas, getMarca, postMarca, updateMarca, deleteMarca } from '../controllers/marca';

const router = Router();

router.get('/', getMarcas as RequestHandler);
router.get('/:id', getMarca as RequestHandler);
router.post('/', postMarca as RequestHandler);
router.put('/:id', updateMarca as RequestHandler);
router.delete('/:id', deleteMarca as RequestHandler);

export default router;