import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['token'];  // Recuperar el token desde las cookies

  if (!token) {
    return res.status(401).json({ msg: 'Acceso denegado. No se encontró token.' });
  }

  try {
    // Verificar el token
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY || 'pepito123');
    req.user = decoded;  // Decodifica y agrega al objeto de la solicitud

    next();  // El token es válido, pasa a la siguiente función de middleware o controlador
  } catch (error) {
    return res.status(401).json({ msg: 'Token no válido o expirado.' });
  }
};

export default validateToken;
