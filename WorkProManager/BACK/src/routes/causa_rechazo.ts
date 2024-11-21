import { Router } from 'express';

import { getCausas, getCausa, deleteCausa, postCausa, updateCausa} from '../controllers/causa_rechazo';

const router = Router();

router.get('/', getCausas);
router.get('/:id', getCausa);
router.delete('/:id', deleteCausa);
router.post('/', postCausa);
router.put('/:id', updateCausa);

export default router;
