import { Request, Response } from 'express';
import OtReporte from '../models/otReporte';
import Order from '../models/orders';
import Reporte from '../models/reporte';
import { Op } from 'sequelize';

// Obtener todas las relaciones por id_ot
export const getOtReportesByOrderId = async (req: Request, res: Response) => {
    const { id_ot, idreporte } = req.params;

    try {
        const otReportes = await OtReporte.findAll({
            where: { id_ot, idreporte },
            include: [Order, Reporte] // Para obtener los datos asociados
        });

        if (otReportes.length === 0) {
            return res.status(404).json({ msg: `No se encontraron reportes para la orden con id_ot: ${id_ot} ${idreporte}` });
        }

        res.json(otReportes);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener las relaciones por id_ot',
            error
        });
    }
};

export const getOtReportesByIds = async (req: Request, res: Response) => {
    const { id_ot, idreporte } = req.params; // Get both parameters

    try {
        const otReportes = await OtReporte.findAll({
            where: { 
                id_ot, 
                idreporte // Include both primary keys in the query
            },
            include: [Order, Reporte] // To get associated data
        });

        if (otReportes.length === 0) {
            return res.status(404).json({ msg: `No se encontraron reportes para la orden con id_ot: ${id_ot} y idreporte: ${idreporte}` });
        }

        res.json(otReportes);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener las relaciones por id_ot y idreporte',
            error
        });
    }
};

// Obtener una relación por id_ot y idreporte
export const getOtReporteByIds = async (req: Request, res: Response) => {
    const { id_ot, idreporte } = req.params;

    try {
        const otReporte = await OtReporte.findOne({
            where: { id_ot, idreporte },
            include: [Order, Reporte]
        });

        if (!otReporte) {
            return res.status(404).json({ msg: `No se encontró la relación con id_ot: ${id_ot} y idreporte: ${idreporte}` });
        }

        res.json(otReporte);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener la relación',
            error
        });
    }
};

// Eliminar una relación OtReporte
export const deleteOtReporte = async (req: Request, res: Response) => {
    const { id_ot, idreporte } = req.params;

    try {
        const otReporte = await OtReporte.findOne({
            where: { id_ot, idreporte }
        });

        if (!otReporte) {
            return res.status(404).json({ msg: `No se encontró la relación con id_ot: ${id_ot} y idreporte: ${idreporte}` });
        }

        await otReporte.destroy();
        res.json({ msg: 'Relación OtReporte eliminada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar la relación OtReporte',
            error
        });
    }
};
