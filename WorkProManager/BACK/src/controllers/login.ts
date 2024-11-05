import router from "../routes/order";
import Usuario from '../models/usuario'; // Asegúrate de tener el modelo de Usuario importado
import Rol from '../models/rol';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response, Request, NextFunction } from "express";
import bcrypt from 'bcrypt';
import { Jwt } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const secretKey = JWT_SECRET

export const login = async (req: Request, res: Response) => {

  const rut_usuario = req.body.rut_usuario;
  const password = req.body.password;
  
    const usuario = await Usuario.findOne({ where: { rut_usuario } });
    if(!usuario){
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const isValid = await bcrypt.compare(password, (usuario as any).password);
    if (!isValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  
    const { password: pass, ...publicData } = usuario.toJSON()
    return publicData;
  
  };    

  export const verificarTokenn = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.access_token;

    if (!token) {
        console.log("No se encontró el token en las cookies");
        res.status(401).json({ message: 'No hay token' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

        // Extrae el `rut_usuario` del payload del token
        const rut_usuario = decoded.rut_usuario;
        if (!rut_usuario) {
            console.log("RUT de usuario no encontrado en el token");
            res.status(400).json({ message: 'RUT de usuario no encontrado en el token' });
            return;
        }

        // Agregar el `rut_usuario` al request para usarlo en la respuesta o en otras rutas
        (req as any).rut_usuario = rut_usuario;

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            console.log("Token expirado");
            res.status(401).json({ message: 'Token expirado' });
        } else {
            console.log("Token inválido");
            res.status(401).json({ message: 'Token inválido' });
        }
    }
};
