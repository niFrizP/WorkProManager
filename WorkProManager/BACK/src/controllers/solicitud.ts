import { Request, Response } from 'express';
import Solicitud from '../models/solicitud';
import { Model } from 'sequelize';

export const getSolicitudes = async (req: Request, res: Response) => {
    const listSolicitudes = await Solicitud.findAll({
        include: [{ all: true }]
    });
    
    res.json(listSolicitudes);
};

export const getSolicitud = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const solicitud = await Solicitud.findByPk(id);
        if (solicitud) {
            res.json(solicitud);
        } else {
            res.status(404).json({
                msg: `No existe un solicitud con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error al obtener el solicitud, contacta con soporte`
        });
    }
};

export const deleteSolicitud = async (req: Request, res: Response) => {
    const { id } = req.params;
    const solicitud = await Solicitud.findByPk(id);
    
    if (!solicitud) {
        res.status(404).json({
            msg: `No existe un solicitud con el id ${id}`
        });
    } else {
        await solicitud.destroy();
        res.json({
            msg: 'El solicitud fue eliminado con éxito!'
        });
    }
};

export const postSolicitud = async (req: Request, res: Response) => {
    const { desc_sol, id_estado_ot, id_ot, isView,fecha_emision, completada ,fecha_vista, fecha_termino, fecha_plazo } = req.body; // Extrae el solicitud

    try {
        const newSolicitud = await Solicitud.create({
            desc_sol, id_estado_ot, id_ot, isView, fecha_vista, fecha_termino, fecha_emision, fecha_plazo, completada
        });

        res.json({
            msg: 'El solicitud fue agregado con éxito!',
            solicitud: newSolicitud // Devuelve el nuevo solicitud, incluyendo el id_solicitud generado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};

export const updateSolicitud = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const solicitud = await Solicitud.findByPk(id);
        if (solicitud) {
            await solicitud.update(body);
            res.json({
                msg: 'El solicitud fue actualizado con éxito'
            });
        } else {
            res.status(404).json({
                msg: `No existe un solicitud con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps, ocurrió un error. Comuníquese con soporte`
        });
    }
};

export const getDetallesOtByOT = async (req: Request, res: Response) => {
    const { id_ot } = req.params;
    try {
        const solicitud = await Solicitud.findAll({
            include: [{ all: true }],
            where: { id_ot }
        });
        res.json(solicitud);
    } catch (error) {
        console.error('Error en solicitud:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


export const getDetallesOtByOTFilter = async (req: Request, res: Response) => {
    const { id_ot } = req.params;
    try {
        const solicitud = await Solicitud.findAll({
            where: { id_ot }
        });
        res.json(solicitud);
    } catch (error) {
        console.error('Error en solicitud:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}