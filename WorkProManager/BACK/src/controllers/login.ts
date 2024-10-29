import router from "../routes/order";
import Usuario from '../models/usuario'; // Asegúrate de tener el modelo de Usuario importado
import Rol from '../models/rol';
import jwt from 'jsonwebtoken';
import { Response, Request } from "express";
import bcrypt from 'bcrypt';
import { Jwt } from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY as string;






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



export const verificarToken = async (req: Request): Promise<Jwt | null> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, secretKey) as Jwt;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log('Token expirado');
    } else {
      console.log('Token inválido');
    }
    return null;
  }
}

  