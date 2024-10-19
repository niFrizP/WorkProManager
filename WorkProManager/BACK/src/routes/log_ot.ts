import { Router } from 'express';
import { getLogs } from '../controllers/log_ot';

const router = Router();

router.get('/', getLogs);

export default router;
