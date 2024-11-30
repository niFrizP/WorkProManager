import { Request, Response } from 'express';
import Marca from '../models/marca';
import { verificarToken, verificarRol } from '../middleware/autenticacion';

export const getMarcas = async (req: Request, res: Response) => {
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const listMarcas = await Marca.findAll({
            attributes: ['id_marca', 'nom_marca'],
            order: [['nom_marca', 'ASC']]
        });
        res.json(listMarcas);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener las marcas'
        });
    }
};

export const getMarca = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const marca = await Marca.findByPk(id);
        if (marca) {
            res.json(marca);
        } else {
            res.status(404).json({
                msg: `No existe una marca con el ID ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener la marca'
        });
    }
};

export const postMarca = async (req: Request, res: Response) => {
    const { id_marca, nom_marca } = req.body;

    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para crear marcas'
            });
        }

        // Verificar si ya existe la marca
        const marcaExiste = await Marca.findOne({
            where: {
                id_marca
            }
        });

        if (marcaExiste) {
            return res.status(400).json({
                msg: `Ya existe una marca con el ID ${id_marca}`
            });
        }

        const marca = await Marca.create({
            id_marca,
            nom_marca
        });

        res.json(marca);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear la marca'
        });
    }
};

export const updateMarca = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nom_marca } = req.body;

    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para actualizar marcas'
            });
        }

        const marca = await Marca.findByPk(id);
        if (!marca) {
            return res.status(404).json({
                msg: `No existe una marca con el ID ${id}`
            });
        }

        await marca.update({
            nom_marca
        });

        res.json(marca);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar la marca'
        });
    }
};

export const deleteMarca = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para eliminar marcas'
            });
        }

        const marca = await Marca.findByPk(id);
        if (!marca) {
            return res.status(404).json({
                msg: `No existe una marca con el ID ${id}`
            });
        }

        await marca.destroy();
        res.json({
            msg: 'Marca eliminada con éxito'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al eliminar la marca'
        });
    }
};
