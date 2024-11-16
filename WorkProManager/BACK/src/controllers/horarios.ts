import { Request, Response } from 'express';
import Horarios from '../models/horarios'; // Adjust the path as necessary

// Create a new Horarios entry
export const createHorario = async (req: Request, res: Response) => {
    try {
        const { rut_usuario, dia_semana, hora_inicio, hora_fin } = req.body;
        const newHorario = await Horarios.create({ rut_usuario, dia_semana, hora_inicio, hora_fin });
        return res.status(201).json(newHorario);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating horario', error });
    }
};

// Get all Horarios entries
export const getAllHorarios = async (req: Request, res: Response) => {
    try {
        const horarios = await Horarios.findAll();
        return res.status(200).json(horarios);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching horarios', error });
    }
};

// Get a single Horarios entry by ID
export const getHorarioById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const horario = await Horarios.findByPk(id);
        if (horario) {
            return res.status(200).json(horario);
        } else {
            return res.status(404).json({ message: 'Horario not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching horario', error });
    }
};

// Update a Horarios entry by ID
export const updateHorario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { rut_usuario, dia_semana, hora_inicio, hora_fin } = req.body;
    try {
        const [updated] = await Horarios.update({ rut_usuario, dia_semana, hora_inicio, hora_fin }, {
            where: { id }
        });
        if (updated) {
            const updatedHorario = await Horarios.findByPk(id);
            return res.status(200).json(updatedHorario);
        }
        return res.status(404).json({ message: 'Horario not found' });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating horario', error });
    }
};

// Delete a Horarios entry by ID
export const deleteHorario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleted = await Horarios.destroy({
            where: { id }
        });
        if (deleted) {
            return res.status(204).send();
        }
        return res.status(404).json({ message: 'Horario not found' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting horario', error });
    }
};