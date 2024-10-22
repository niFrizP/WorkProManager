import Tipo_Equipo from '../models/tipo';
import { Request, Response } from 'express';

export const getTipos = async (req: Request, res: Response) => {
    const listTipos = await Tipo_Equipo.findAll();
    res.json(listTipos);
};

export const getTipo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const tipo = await Tipo_Equipo.findByPk(id);
    res.json(tipo);
};

export const postTipo = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        await Tipo_Equipo.create(body);
        res.json({
            msg: 'El tipo fue agregado con éxito'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
}


export const updateTipo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        await Tipo_Equipo.update(body, { where: { id_tipo: id } });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
}

export const deleteTipo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Tipo_Equipo.destroy({ where: { id_tipo: id } });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
}
