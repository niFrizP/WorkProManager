/**
 * @constant {string} JWT_SECRET
 * @description Clave secreta utilizada para firmar y verificar tokens JWT.
 * @default 'defaultsecret'
 */


// config.ts
import dotenv from 'dotenv';

// Carga las variables de entorno
dotenv.config();

// Exporta la clave secreta
export const JWT_SECRET: string = 'defaultsecret';
