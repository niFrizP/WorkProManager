import { Request, Response } from 'express';
import adjudicacion from '../models/adjudicaccion';

export const getAdjudicaciones = async (req: Request, res: Response) => {
    try {
        const listMarcas = await adjudicacion.findAll();
        res.json(listMarcas);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener las marcas, contacta con soporte'
        });
    }
}

export const getAdjudicacion = async (req: Request, res: Response) => {
    const { id_adjudicacion } = req.params;
    try {
        const marca = await adjudicacion.findByPk(id_adjudicacion);

        if (marca) {
            res.json(marca);
        } else {
            res.status(404).json({
                msg: `No existe una marca con el id ${id_adjudicacion}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener la marca, contacta con soporte'
        });
    }
};

export const deleteAdjudicacion = async (req: Request, res: Response) => {
    const { id_adjudicacion } = req.params;
    const marca = await adjudicacion.findByPk(id_adjudicacion);

    if (!marca) {
        res.status(404).json({
            msg: `No existe una marca con el id ${id_adjudicacion}`
        });
    } else {
        await marca.destroy();
        res.json({
            msg: 'La marca fue eliminada con éxito!'
        });
    }
}

export const postAdjudicacion = async (req: Request, res: Response) => {
    const { fecha_adjudicacion, id_ot, rut_usuario } = req.body;

    try {
        const newAdjudicacion = await adjudicacion.create({
            fecha_adjudicacion,
            id_ot,
            rut_usuario
        });

        res.json({
            msg: 'Adjudicación creada con éxito!',
            adjudicacion: newAdjudicacion // Devuelve el objeto esperado por el frontend
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};


export const updateAdjudicacion = async (req: Request, res: Response) => {
    const { body } = req;
    const { id_adjudicacion } = req.params;

    try {
        const marca = await adjudicacion.findByPk(id_adjudicacion);

        if (marca) {
            await marca.update(body);
            res.json({
                msg: 'La marca fue actualizada con éxito'
            });
        } else {
            res.status(404).json({
                msg: `No existe una marca con el id ${id_adjudicacion}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};
