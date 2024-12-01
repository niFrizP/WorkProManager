// routes/ordenTrabajoRoutes.ts

import { Router } from 'express';
import { insertar_servicio_orden } from '../controllers/insertar_servicio_orden';

const router = Router();

router.post('/crear-servicio-orden', insertar_servicio_orden);

export default router;
