import { Router } from 'express';
import {  getSolicitudes, updateSolicitud, deleteSolicitud,getSolicitud, postSolicitud,getDetallesOtByOT  } from '../controllers/solicitud';

const router = Router();

router.get('/', getSolicitudes);
router.get('/solicitud/:id_ot', getDetallesOtByOT);

router.get('/:id', getSolicitud);
router.post('/', postSolicitud);
router.put('/:id', updateSolicitud);
router.delete('/:id', deleteSolicitud);


export default router;