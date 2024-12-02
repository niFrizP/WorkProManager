import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser'; // Asegúrate de tener esta dependencia instalada

interface JwtPayload {
  rut_trab: number;
  id_rol: number;
}

// Middleware para validar el token JWT
export const validateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies['token']; // Leer el token desde las cookies

  if (!token) {
    // Si no hay token, responde y finaliza el flujo
    res.status(401).json({ msg: 'Acceso denegado. No se encontró token.' });
    return; // Evita continuar con el siguiente middleware o ruta
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'pepito123');
    req.user = decoded as JwtPayload; // Agregar el payload al objeto req
    next(); // Llamar a next() para continuar con la siguiente ejecución del middleware o ruta
  } catch (error) {
    // Si el token no es válido, responde y finaliza el flujo
    res.status(401).json({ msg: 'Token no válido o expirado.' });
    return; // Evita continuar con el siguiente middleware o ruta
  }
};