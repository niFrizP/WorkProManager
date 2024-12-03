// routes/ordenTrabajoRoutes.ts

import { Router } from 'express';
import { actualizarOrdenClienteEquipoAsign, insertarOrdenClienteEquipoAsign } from '../controllers/insertarCotizacion';
import { validateToken } from './validar_token';
const router = Router();

router.post('/crear-orden-trabajo', validateToken ,insertarOrdenClienteEquipoAsign);

router.post('/', validateToken ,actualizarOrdenClienteEquipoAsign);

export default router;
