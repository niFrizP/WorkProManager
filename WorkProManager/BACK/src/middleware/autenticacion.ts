import { Request } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
    rut_trab: number;
    id_rol: number;
}

export const verificarToken = async (req: Request): Promise<DecodedToken | null> => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as DecodedToken;
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

export const esAdmin = (decoded: DecodedToken | null): boolean => {
    return decoded?.id_rol === 1;
}

export const esGestor = (decoded: DecodedToken | null): boolean => {
    return decoded?.id_rol === 2;
}

export const esTecnico = (decoded: DecodedToken | null): boolean => {
    return decoded?.id_rol === 3;
}

export const verificarRol = (decoded: DecodedToken | null, rolesPermitidos: number[]): boolean => {
    if (!decoded) return false;
    return rolesPermitidos.includes(decoded.id_rol);
}

export const obtenerRutTrabajador = (decoded: DecodedToken | null): number | null => {
    return decoded?.rut_trab || null;
}