import { Request, Response } from 'express';
import Equipo from '../models/equipo';

// Obtener todos los equipos
export const getEquipos = async (req: Request, res: Response) => {
    try {
        const equipos = await Equipo.findAll();
        res.json(equipos);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving equipos', error });
    }
};

// Obtener un equipo por número de serie
export const getEquipoByNumSer = async (req: Request, res: Response) => {
    const { num_ser } = req.params;
    try {
        const equipo = await Equipo.findByPk(num_ser);
        if (equipo) {
            res.json(equipo);
        } else {
            res.status(404).json({ message: 'Equipo not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving equipo', error });
    }
};

// Crear un nuevo equipo
export const createEquipo = async (req: Request, res: Response) => {
    const { num_ser, tip_equ, mod_equ, id_marca } = req.body;
    try {
        const newEquipo = await Equipo.create({ num_ser, tip_equ, mod_equ, id_marca });
        res.status(201).json(newEquipo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating equipo', error });
    }
};

// Actualizar un equipo existente
export const updateEquipo = async (req: Request, res: Response) => {
    const { num_ser } = req.params;
    const { tip_equ, mod_equ, id_marca } = req.body;
    try {
        const equipo = await Equipo.findByPk(num_ser);
        if (equipo) {
            equipo.tip_equ = tip_equ;
            equipo.mod_equ = mod_equ;
            equipo.id_marca = id_marca;
            await equipo.save();
            res.json(equipo);
        } else {
            res.status(404).json({ message: 'Equipo not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating equipo', error });
    }
};

// Eliminar un equipo
export const deleteEquipo = async (req: Request, res: Response) => {
    const { num_ser } = req.params;
    try {
        const equipo = await Equipo.findByPk(num_ser);
        if (equipo) {
            await equipo.destroy();
            res.json({ message: 'Equipo deleted' });
        } else {
            res.status(404).json({ message: 'Equipo not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting equipo', error });
    }
};
