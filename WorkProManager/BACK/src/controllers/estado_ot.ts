import { Request, Response } from 'express';
import EstadoOT from '../models/estado_ot'; // Importar el modelo EstadoOT

// Obtener todos los estados de orden de trabajo
export const getEstadosOT = async (req: Request, res: Response) => {
  try {
    const estadosOT = await EstadoOT.findAll();
    res.json(estadosOT);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving estados', error });
  }
};

// Obtener un estado de orden de trabajo por ID
export const getEstadoOTById = async (req: Request, res: Response) => {
  const { id_estado } = req.params;
  try {
    const estadoOT = await EstadoOT.findByPk(id_estado);
    if (estadoOT) {
      res.json(estadoOT);
    } else {
      res.status(404).json({ message: 'Estado de OT not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving estado', error });
  }
};

// Crear un nuevo estado de orden de trabajo
export const createEstadoOT = async (req: Request, res: Response) => {
  const { nom_estado } = req.body;
  try {
    const newEstadoOT = await EstadoOT.create({ nom_estado });
    res.status(201).json(newEstadoOT);
  } catch (error) {
    res.status(500).json({ message: 'Error creating estado de OT', error });
  }
};

// Actualizar un estado de orden de trabajo existente
export const updateEstadoOT = async (req: Request, res: Response) => {
  const { id_estado } = req.params;
  const { nom_estado } = req.body;
  try {
    const estadoOT = await EstadoOT.findByPk(id_estado);
    if (estadoOT) {
      estadoOT.nom_estado = nom_estado;
      await estadoOT.save();
      res.json(estadoOT);
    } else {
      res.status(404).json({ message: 'Estado de OT not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating estado de OT', error });
  }
};

// Eliminar un estado de orden de trabajo
export const deleteEstadoOT = async (req: Request, res: Response) => {
  const { id_estado } = req.params;
  try {
    const estadoOT = await EstadoOT.findByPk(id_estado);
    if (estadoOT) {
      await estadoOT.destroy();
      res.json({ message: 'Estado de OT deleted' });
    } else {
      res.status(404).json({ message: 'Estado de OT not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting estado de OT', error });
  }
};
