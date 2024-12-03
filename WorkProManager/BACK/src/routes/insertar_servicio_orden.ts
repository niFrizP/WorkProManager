// routes/ordenTrabajoRoutes.ts

import { Router } from 'express';
import { insertar_servicio_orden } from '../controllers/insertar_servicio_orden';
import { validateToken } from './validar_token';

const router = Router();

router.post('/crear-servicio-orden', insertar_servicio_orden, validateToken);


export default router;
