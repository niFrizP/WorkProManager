import { Request, Response } from 'express';
import Detalle_Ot from '../models/detalle_ot';
import Servicio from '../models/servicio';

// Obtener todos los detalles de OT
export const getDetallesOt = async (req: Request, res: Response) => {
    try {
        const detallesOt = await Detalle_Ot.findAll({include: [{model: Servicio, attributes: ['nom_serv']}]
        }
        );
        res.json(detallesOt);
    } catch (error) {
        console.error('Error en getDetallesOt:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getDetallesOtByOT = async (req: Request, res: Response) => {
    const { id_ot } = req.params;
    try {
        const detallesOt = await Detalle_Ot.findAll({ include: [{model: Servicio,
            attributes: ['nom_serv']
        }],
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
    const { id_ot, id_serv } = req.params;
    try {
        const detalleOt = await Detalle_Ot.findOne({
            where: { id_ot, id_serv}, include: [{model: Servicio, attributes: ['nom_serv']}]
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
    const { id_ot, id_serv, fecha_detalle, desc_detalle, rut_usuario, d_estado } = req.body;

    try {
        const newDetalleOt = await Detalle_Ot.create({
            id_ot,
            id_serv,
            fecha_detalle,
            desc_detalle,
            rut_usuario,
            d_estado
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
    const { id_ot, id_serv } = req.params;
    const { fecha_detalle, desc_detalle, rut_usuario, d_estado } = req.body;

    try {
        const detalleOt = await Detalle_Ot.findOne({
            where: { id_ot, id_serv}
        });

        if (detalleOt) {
            await detalleOt.update({
                id_ot,
                id_serv,
                fecha_detalle,
                desc_detalle,
                rut_usuario,
                d_estado
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
    const { id_ot, id_serv } = req.params;

    try {
        const detalleOt = await Detalle_Ot.findOne({
            where: { id_ot, id_serv }
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
        await Detalle_Ot.destroy({ where: { id_ot } });
        res.json({ message: 'Detalle de OT eliminado con éxito' });
    } catch (error) {
        console.error('Error en deleteDetalleOtByOtId:', error);
        res.status(500).json({ message: 'Error al eliminar el detalle de OT' });
    }
};      

export const countDetalleOt = async (req: Request, res: Response) => {
    const { id_ot } = req.params;
    try {
        const counta = await Detalle_Ot.count({
            where: { id_ot }
        });
        res.json(counta);
    } catch (error) {
        console.error('Error en countDetalleOt:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const countDetalleOtByEstado = async (req: Request, res: Response) => {
    const { id_ot, d_estado } = req.params;
    try {
        const counta = await Detalle_Ot.count({
            where: { id_ot, d_estado }
        });
        res.json(counta);
    } catch (error) {
        console.error('Error en countDetalleOt:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}



