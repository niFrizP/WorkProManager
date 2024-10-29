import { Router } from 'express';
import { login } from '../controllers/login';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import cookieparser from 'cookie-parser';
import { Request, Response } from 'express';
import { Jwt } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuario from '../models/usuario';
import  { verificarToken } from '../middleware/autenticacion';

const router = Router();

router.post('/', async (req, res) => {
    const response = await login(req, res);
    const token = jwt.sign(
        {
            rut_usuario: response?.rut_usuario,
            rol: response?.rol,
            iat: Math.floor(Date.now() / 1000), // Timestamp actual
        },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
        if (response) {
        res.cookie('access_token', token, {
            httpOnly: false, //COOKIE PUEDE ACCEDERSE SOLO DESDE EL SERVIDOR
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 60 * 60 * 1000 //1 HORA
        });
        res.send({response, token});
            } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.send({ message: 'Logout exitoso' });
});

router.get('/verify', cookieparser(), (req, res) => {
    console.log("Cookies en solicitud:", req.cookies); // Muestra las cookies
    const token = req.cookies.access_token;
    if (!token) {
        console.log("No se encontró el token"); // Log si no hay token
        res.status(401).json({ message: 'No hay token' });
        return;
    }
    console.log("Token encontrado:", token); // Muestra el token encontrado
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            console.log("Error al verificar el token:", err); // Log del error
            res.status(401).json({ message: 'Token inválido' });
            return;
        }
        console.log("Token verificado, datos decodificados:", decoded); // Log de datos decodificados
        res.send(decoded);
    });
});


    

 
export default router;
