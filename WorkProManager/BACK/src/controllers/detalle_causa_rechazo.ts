import { Request, Response } from 'express';
import CausaRechazo from '../models/causa_rechazo';
import orden_causa_rechazo from '../models/detalle_causa_rechazo';
import { Sequelize } from 'sequelize';

// Obtener todos los detalles de OT
export const getDetallesOt = async (req: Request, res: Response) => {
    try {
        const detallesOt = await orden_causa_rechazo.findAll({
            include: [{model: CausaRechazo, attributes: ['nombre_rechazo']}]}
        );
        res.json(detallesOt);
    } catch (error) {
        console.error('Error en getDetallesOt:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getDetallesOtByOTCount = async (req: Request, res: Response) => {
    const { id_ot } = req.params;
    try {
        const detallesOt = await orden_causa_rechazo.count({
            where: { id_ot }
        });
        res.json(detallesOt);
    } catch (error) {
        console.error('Error en getDetallesOt:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


export const getDetallesOtByOT = async (req: Request, res: Response) => {
    const { id_ot } = req.params;
    try {
        const detallesOt = await orden_causa_rechazo.findAll({
            where: { id_ot }
        });
        res.json(detallesOt);
    } catch (error) {
        console.error('Error en getDetallesOt:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener detalle de OT por ID
export const getDetalleOt = async (req: Request, res: Response) => {
    const { id_ot, id_rechazo } = req.params;
    try {
        const detalleOt = await orden_causa_rechazo.findOne({
            where: { id_ot, id_rechazo}, include: [{model: CausaRechazo, attributes: ['nombre_rechazo']}]
        });

        if (detalleOt) {
            res.json(detalleOt);
        } else {
            res.status(404).json({ message: 'Detalle de OT no encontrado' });
        }
    } catch (error) {
        console.error('Error en getDetalleOt:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear un nuevo detalle de OT
export const postDetalleOt = async (req: Request, res: Response) => {
    const { id_ot, id_rechazo, fecha_rechazo, observaciones} = req.body;

    try {
        const newDetalleOt = await orden_causa_rechazo.create({
            id_ot,
            id_rechazo,
            fecha_rechazo,
            observaciones

        });

        res.status(201).json({
            message: 'Detalle de OT creado con éxito',
            detalleOt: newDetalleOt
        });
    } catch (error) {
        console.error('Error en postDetalleOt:', error);
        res.status(500).json({ message: 'Error al crear el detalle de OT' });
    }
};

// Actualizar un detalle de OT
export const updateDetalleOt = async (req: Request, res: Response) => {
    const { id_ot, id_rechazo } = req.params;
    const { fecha_rechazo, observaciones } = req.body;

    try {
        const detalleOt = await orden_causa_rechazo.findOne({
            where: { id_ot, id_rechazo}
        });

        if (detalleOt) {
            await detalleOt.update({
                id_ot,
                id_rechazo,
                fecha_rechazo,
                observaciones,

            });
            res.json({ message: 'Detalle de OT actualizado con éxito' });
            

        } else {
            res.status(404).json({ message: 'Detalle de OT no encontrado' });
        }
    } catch (error) {
        console.error('Error en updateDetalleOt:', error);
        res.status(500).json({ message: 'Error al actualizar el detalle de OT' });
    }
};

// Eliminar un detalle de OT
export const deleteDetalleOt = async (req: Request, res: Response) => {
    const { id_ot, id_rechazo } = req.params;

    try {
        const detalleOt = await orden_causa_rechazo.findOne({
            where: { id_ot, id_rechazo }
        });

        if (detalleOt) {
            await detalleOt.destroy();
            res.json({ message: 'Detalle de OT eliminado con éxito' });
        } else {
            res.status(404).json({ message: 'Detalle de OT no encontrado' });
        }
    } catch (error) {
        console.error('Error en deleteDetalleOt:', error);
        res.status(500).json({ message: 'Error al eliminar el detalle de OT' });
    }
};


export const deleteDetalleOtByOtId = async (req: Request, res: Response) => {
    const { id_ot } = req.params;
    try {
        await orden_causa_rechazo.destroy({ where: { id_ot } });
        res.json({ message: 'Detalle de OT eliminado con éxito' });
    } catch (error) {
        console.error('Error en deleteDetalleOtByOtId:', error);
        res.status(500).json({ message: 'Error al eliminar el detalle de OT' });
    }
};      

export const countDetalleOt = async (req: Request, res: Response) => {
    const { id_ot } = req.params;
    try {
        const counta = await orden_causa_rechazo.count({
            where: { id_ot }
        });
        res.json(counta);
    } catch (error) {
        console.error('Error en countDetalleOt:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}



export const countDetalleOtByEstado = async (req: Request, res: Response) => {
    const { id_ot, id_rechazo } = req.params;
    try {
        const counta = await orden_causa_rechazo.count({
            where: { id_ot, id_rechazo }
        });
        res.json(counta);
    } catch (error) {
        console.error('Error en countDetalleOt:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}



export const getDetallesByOT = async (req: Request, res: Response) => {
    const { id_ot } = req.params;
    try {
        const detallesOt = await orden_causa_rechazo.findAll({
            include: [{model: CausaRechazo, attributes: ['nombre_rechazo']}],
            where: { id_ot }
        });
        res.json(detallesOt);
    } catch (error) {
        console.error('Error en getDetallesOt:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const countDetallesByRechazo = async (req: Request, res: Response) => {
    const { id_rechazo } = req.params;
    try {
        const countDetalles = await orden_causa_rechazo.count({
            where: { id_rechazo },
        });
        res.json(countDetalles); // Envía directamente el número
    } catch (error) {
        console.error('Error en countDetallesByRechazo:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};



