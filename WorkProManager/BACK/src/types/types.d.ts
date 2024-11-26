import { Request } from 'express';

// Extiende la interfaz Request de Express
declare global {
    namespace Express {
        interface Request {
            rut_usuario: string; // Tipo adecuado para el rut del usuario
            id_rol: any; // Tipo adecuado para el rol del usuario
        }
    }
}
