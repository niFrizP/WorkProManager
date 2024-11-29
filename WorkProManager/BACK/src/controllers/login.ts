import TrabajadorRol from "../models/trabajador_rol";
import Trabajador from "../models/trabajador";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response, Request, NextFunction } from "express";
import bcrypt from 'bcrypt';
import { Jwt } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const secretKey = JWT_SECRET

export const login = async (req: Request, res: Response) => {
  try {
    const { id_trabajador, clave } = req.body;
    
    const trabajador = await Trabajador.findOne({ where: { id_trabajador } }) as any;
    if (!trabajador) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isValid = await bcrypt.compare(clave, trabajador.clave);
    if (!isValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Crear el token JWT
    const token = jwt.sign(
      { 
        id_trabajador: trabajador.id_trabajador,
        id_rol: trabajador.id_rol
      },
      secretKey,
      { expiresIn: '24h' }
    );

    // Extraer la contraseña del objeto usuario
    const { clave: _, ...userData } = trabajador.toJSON();

    // Configurar la cookie con el token
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 horas
    });

    // Devolver los datos del usuario y el token
    return res.status(200).json({
      message: 'Login exitoso',
      user: userData,
      token
    });

  } catch (error) {
    console.error('Error en el login:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};