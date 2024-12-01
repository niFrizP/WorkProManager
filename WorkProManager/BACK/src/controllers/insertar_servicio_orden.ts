// controllers/servicioOrdenController.ts

import { Request, Response } from 'express';
import { insertarServicioOrden } from '../procedures/insertar_servicio_orden';

export const insertar_servicio_orden = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body; // Suponiendo que los datos vienen en el cuerpo de la petición
    const servicioOrden = await insertarServicioOrden(data);
    res.status(201).json(servicioOrden); // Responde con el objeto de la orden de trabajo del servicio creado
  } catch (error) {
    // Manejo de errores
    console.error(error);
    res.status(500).json({ message: (error as Error).message }); // Devuelve el mensaje de error
  }
};
