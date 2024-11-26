import { Router } from 'express';

import { getAdjudicacion, getAdjudicaciones, getAdjudicacionesByOT,deleteAdjudicacion, postAdjudicacion, updateAdjudicacion} from '../controllers/adjudicaccion';

const router = Router();

router.get('/', getAdjudicaciones);
router.get('/:id', getAdjudicacion);
router.get('/ot/:id_ot', getAdjudicacionesByOT);
router.delete('/:id', deleteAdjudicacion);
router.post('/', postAdjudicacion);
router.put('/:id', updateAdjudicacion);

export default router;
