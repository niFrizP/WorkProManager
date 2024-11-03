import { Request} from "express";
import jwt from "jsonwebtoken";
<<<<<<< HEAD

interface DecodedToken {
    id_usuario: number;
=======
import env from "dotenv";

interface DecodedToken {
    rut_usuario: number;
>>>>>>> b9a15bf71ee39199331c1f05fdccf088284400be
    rol: string;
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
    return decoded?.rol === 'admin';
}
