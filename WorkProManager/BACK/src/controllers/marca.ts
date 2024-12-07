import { Request, Response } from 'express';
import Marca from '../models/marca';

// Get all marcas
export const getMarcas = async (req: Request, res: Response) => {
    try {
        const marcas = await Marca.findAll();
        res.json(marcas);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving marcas', error });
    }
};


// Get a single marca by ID
export const getMarcaById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const marca = await Marca.findByPk(id);
        if (marca) {
            res.json(marca);
        } else {
            res.status(404).json({ message: 'Marca not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving marca', error });
    }
};

// Create a new marca
export const createMarca = async (req: Request, res: Response) => {
    const { nom_marca } = req.body;  // Capturamos el campo correcto
    try {
        const newMarca = await Marca.create({ nom_marca });  // Insertamos en la base de datos
        res.status(201).json(newMarca);
    } catch (error) {
        res.status(500).json({ message: 'Error creating marca', error });
    }
};

// Update an existing marca
export const updateMarca = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nom_marca } = req.body;
    try {
        const marca = await Marca.findByPk(id);
        if (marca) {
            marca.nom_marca = nom_marca;
            await marca.save();
            res.json(marca);
        } else {
            res.status(404).json({ message: 'Marca not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating marca', error });
    }
};

// Delete a marca
export const deleteMarca = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const marca = await Marca.findByPk(id);
        if (marca) {
            await marca.destroy();
            res.json({ message: 'Marca deleted' });
        } else {
            res.status(404).json({ message: 'Marca not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting marca', error });
    }
};