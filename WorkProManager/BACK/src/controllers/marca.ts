import { Request, Response } from 'express';
import Marca from '../models/marca';
import vista_count_marca from '../models/vista_count_marca';

export const getMarcas = async (req: Request, res: Response) => {
    try {
        const listMarcas = await Marca.findAll({include: [{model: vista_count_marca}]});
        res.json(listMarcas);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener las marcas, contacta con soporte'
        });
    }
}

export const getMarca = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const marca = await Marca.findByPk(id);

        if (marca) {
            res.json(marca);
        } else {
            res.status(404).json({
                msg: `No existe una marca con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener la marca, contacta con soporte'
        });
    }
};

export const deleteMarca = async (req: Request, res: Response) => {
    const { id } = req.params;
    const marca = await Marca.findByPk(id);

    if (!marca) {
        res.status(404).json({
            msg: `No existe una marca con el id ${id}`
        });
    } else {
        await marca.destroy();
        res.json({
            msg: 'La marca fue eliminada con éxito!'
        });
    }
}

export const postMarca = async (req: Request, res: Response) => {
    const { nom_marca } = req.body; // Extrae el dato relevante

    try {
        const newMarca = await Marca.create({
            nom_marca
        });

        res.json({
            msg: 'La marca fue agregada con éxito!',
            marca: newMarca // Devuelve la nueva marca, incluyendo el id_marca generado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};

export const updateMarca = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const marca = await Marca.findByPk(id);

        if (marca) {
            await marca.update(body);
            res.json({
                msg: 'La marca fue actualizada con éxito'
            });
        } else {
            res.status(404).json({
                msg: `No existe una marca con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};
