/* import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Interfaz para el token decodificado
interface DecodedToken {
    rut_trab: number;
    id_rol: number;
}


// Verificar el token en el encabezado Authorization
export const verificarToken = async (req: Request): Promise<DecodedToken | null> => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return null;  // Si no existe el token, retornamos null
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as DecodedToken;
        return decoded;  // Si el token es válido, lo retornamos
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            console.log('Token expirado');
        } else {
            console.log('Token inválido');
        }
        return null;  // Si el token es inválido o ha expirado, retornamos null
    }
}

// Verificar si el rol es Admin (ID 1)
export const esAdmin = (decoded: DecodedToken | null): boolean => {
    return decoded?.id_rol === 1;
}

// Verificar si el rol es Gestor (ID 2)
export const esGestor = (decoded: DecodedToken | null): boolean => {
    return decoded?.id_rol === 2;
}

// Verificar si el rol es Técnico (ID 3)
export const esTecnico = (decoded: DecodedToken | null): boolean => {
    return decoded?.id_rol === 3;
}

// Verificar si el rol del usuario es uno de los roles permitidos
export const verificarRol = (decoded: DecodedToken | null, rolesPermitidos: number[]): boolean => {
    if (!decoded) return false;
    return rolesPermitidos.includes(decoded.id_rol);  // Comprobamos si el rol está en la lista de roles permitidos
}

// Obtener el rut del trabajador desde el token decodificado
export const obtenerRutTrabajador = (decoded: DecodedToken | null): number | null => {
    return decoded?.rut_trab || null;
}

// Middleware para verificar si el usuario tiene los permisos adecuados
export const verificarRolesMiddleware = (rolesPermitidos: number[]) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        // Excluir las rutas de cambio de contraseña del middleware
        if (req.originalUrl.startsWith('/api/reset-password')) {
            return next();  // Si es la ruta de reset-password, saltamos la verificación de roles
        }

        const decoded = await verificarToken(req);  // Verificamos el token
        if (!decoded || !verificarRol(decoded, rolesPermitidos)) {
            // Responder con un error si el token no es válido o el rol no está permitido
            res.status(403).json({ msg: 'Acceso denegado: no tienes permisos para esta acción.' });
            return;
        }
        
        req.body.user = decoded;  // Adjuntamos los datos del usuario a la solicitud
        next();  // Continuamos con el siguiente middleware o controlador
    };
};
 */