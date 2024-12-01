// routes/ordenTrabajoRoutes.ts

import { Router } from 'express';
import { crearOrdenTrabajo } from '../controllers/insertarCotizacion';
const router = Router();

router.post('/crear-orden-trabajo', crearOrdenTrabajo);

export default router;
