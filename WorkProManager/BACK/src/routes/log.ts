import { Router } from 'express';
import { getLog, getLogs, updateLog, deleteLog, postLog } from '../controllers/log';

const router = Router();

router.get('/', getLogs);
router.get('/:id', getLog);
router.delete('/:id', deleteLog);
router.post('/', postLog);
router.put('/:id', updateLog);

export default router;
