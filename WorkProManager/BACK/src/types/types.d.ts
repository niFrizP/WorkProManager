// src/types/express.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { 
        rut_trab: number;  // o number, según el tipo de rut_trab
        id_rol: number;
      };
    }
  }
}
