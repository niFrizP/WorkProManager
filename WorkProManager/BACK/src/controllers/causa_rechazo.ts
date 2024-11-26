import { Request, Response } from 'express';
import CausaRechazo from '../models/causa_rechazo';
import vista_count_ot_por_rechazo from '../models/ot_db.vista_count_ot_por_rechazo';

export const getCausas = async (req: Request, res: Response) => {
    try {
        const listMarcas = await CausaRechazo.findAll(
            {include: [{model: vista_count_ot_por_rechazo}],
                where: {
                    isactiva: true
                }
            }
        );
        res.json(listMarcas);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener las marcas, contacta con soporte'
        });
    }
}

export const getCausa = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const marca = await CausaRechazo.findByPk(id);

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

export const deleteCausa = async (req: Request, res: Response) => {
    const { id } = req.params;
    const marca = await CausaRechazo.findByPk(id);

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

export const postCausa = async (req: Request, res: Response) => {
    const { nombre_rechazo, isactive } = req.body; // Extrae el dato relevante

    try {
        const newMarca = await CausaRechazo.create({
            nombre_rechazo,
            isactive
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

export const updateCausa = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const marca = await CausaRechazo.findByPk(id);

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
