// controllers/ordenTrabajoController.ts

import { Request, Response } from 'express';
import { insertarOrdenClienteEquipoAsig } from '../procedures/insertarCotizacion';

export const crearOrdenTrabajo = async (req: Request, res: Response) => {
  try {
    const data = req.body; // Suponiendo que los datos vienen en el cuerpo de la petición
    const ordenTrabajo = await insertarOrdenClienteEquipoAsig(data);
    res.status(201).json(ordenTrabajo);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
