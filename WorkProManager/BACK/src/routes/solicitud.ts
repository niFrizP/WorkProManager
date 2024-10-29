import { Router } from 'express';
import {  getSolicitudes, updateSolicitud, deleteSolicitud,getSolicitud, postSolicitud  } from '../controllers/solicitud';

const router = Router();

router.get('/', getSolicitudes);
router.get('/:id', getSolicitud);
router.post('/', postSolicitud);
router.put('/:id', updateSolicitud);
router.delete('/:id', deleteSolicitud);


export default router;