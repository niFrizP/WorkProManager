import { Router } from 'express';
import { login } from '../controllers/login';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

const router = Router();

router.post('/', async (req, res) => {
    const response = await login(req, res);
    const token = jwt.sign({ rut_usuario: response?.rut_usuario, rol: response?.rol }, JWT_SECRET, { expiresIn: '1h' });
    if (response) {
        res.cookie('access_token', token, {
            httpOnly: true, //COOKIE PUEDE ACCEDERSE SOLO DESDE EL SERVIDOR
            secure: process.env.NODE_ENV === 'production' ? true : false,
            maxAge: 60 * 60 * 1000 //1 HORA
        });
        res.send({response, token});
            } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
    }
});
 
export default router;
