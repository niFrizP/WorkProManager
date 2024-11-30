import { Request, Response } from 'express';
import Servicio from '../models/servicio';

// Obtener todos los servicios
export const getServicios = async (req: Request, res: Response) => {
    try {
        const servicios = await Servicio.findAll();
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving servicios', error });
    }
};

// Obtener un servicio por ID
export const getServicioById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const servicio = await Servicio.findByPk(id);
        if (servicio) {
            res.json(servicio);
        } else {
            res.status(404).json({ message: 'Servicio not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving servicio', error });
    }
};

// Crear un nuevo servicio
export const createServicio = async (req: Request, res: Response) => {
    const { nom_serv, activo } = req.body;
    try {
        const newServicio = await Servicio.create({ nom_serv, activo });
        res.status(201).json(newServicio);
    } catch (error) {
        res.status(500).json({ message: 'Error creating servicio', error });
    }
};

// Actualizar un servicio existente
export const updateServicio = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nom_serv, activo } = req.body;
    try {
        const servicio = await Servicio.findByPk(id);
        if (servicio) {
            servicio.nom_serv = nom_serv;
            servicio.activo = activo;
            await servicio.save();
            res.json(servicio);
        } else {
            res.status(404).json({ message: 'Servicio not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating servicio', error });
    }
};

// Eliminar un servicio
export const deleteServicio = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const servicio = await Servicio.findByPk(id);
        if (servicio) {
            await servicio.destroy();
            res.json({ message: 'Servicio deleted' });
        } else {
            res.status(404).json({ message: 'Servicio not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting servicio', error });
    }
};
