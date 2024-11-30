import { Router } from 'express';
import { login } from '../controllers/login';

const router = Router();

// Ruta para el login
router.post('/login', login);

export default router; 