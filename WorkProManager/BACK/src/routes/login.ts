import { NextFunction, Router } from 'express';
import { login, verificarTokenn } from '../controllers/login';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import cookieparser from 'cookie-parser';
import { Request, Response } from 'express';
import { Jwt } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuario from '../models/usuario';

const router = Router();

router.post('/', async (req, res) => {
    const response = await login(req, res);
    if (response) {
    const token = jwt.sign(
        {
            rut_usuario: response?.rut_usuario,
            rol: response.rol,
            iat: Math.floor(Date.now() / 1000), // Timestamp actual
        },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
        if (response) {
        res.cookie('access_token', token, {
            path: '/',
            httpOnly: true, //COOKIE PUEDE ACCEDERSE SOLO DESDE EL SERVIDOR
            secure: true, //SOLO SE ENVIA SI ES HTTPS
            sameSite: 'none',
            maxAge: 60 * 60 * 1000 //1 HORA
        });
        res.send({response, token});
            } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
            }
        }
    });

router.post('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.send({ message: 'Logged out successfully' });
});

// Ruta de verificación de token
router.get('/verify', verificarTokenn, (req: Request, res: Response) => {
    // Responde solo con el `rut_usuario`
    res.json({ rut_usuario: (req as any).rut_usuario });
});


export default router;
