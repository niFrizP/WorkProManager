// config.ts
import dotenv from 'dotenv';

// Carga las variables de entorno
dotenv.config();

// Exporta la clave secreta
export const JWT_SECRET: string = 'defaultsecret';
