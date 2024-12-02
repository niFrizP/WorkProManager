// controllers/ordenTrabajoController.ts

import { Request, Response } from 'express';
import { insertarOrdenClienteEquipoAsig } from '../procedures/insertarCotizacion';
import { actualizarOrdenClienteEquipoAsig } from '../procedures/insertarActualizacion';

export const insertarOrdenClienteEquipoAsign = async (req: Request, res: Response) => {
  try {
    const data = req.body; // Suponiendo que los datos vienen en el cuerpo de la petición
    const ordenTrabajo = await insertarOrdenClienteEquipoAsig(data);
    res.status(201).json(ordenTrabajo);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};


export const actualizarOrdenClienteEquipoAsign = async (req: Request, res: Response) => {
  try {
    const data = req.body; // Suponiendo que los datos vienen en el cuerpo de la petición
    const ordenTrabajo = await actualizarOrdenClienteEquipoAsig(data);
    res.status(201).json(ordenTrabajo);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
