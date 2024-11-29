import { Request, Response } from 'express';
import HistorialOrden from '../models/historial_orden';
import Asignacion from '../models/asignacion';
import Accion from '../models/accion';
import Trabajador from '../models/trabajador';

// Obtener todo el historial de órdenes
export const getHistorialOrdenes = async (req: Request, res: Response) => {
    try {
        const historial = await HistorialOrden.findAll({
            include: [
                {
                    model: Asignacion,
                    attributes: ['id_ot']
                },
                {
                    model: Accion,
                    attributes: ['nombre_accion']
                },
                {
                    model: Trabajador,
                    attributes: ['nombre', 'apellido']
                }
            ],
            order: [['fecha_cambio', 'DESC']]
        });
        res.json(historial);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el historial de órdenes'
        });
    }
};

// Obtener historial por ID
export const getHistorialOrden = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const historial = await HistorialOrden.findByPk(id, {
            include: [
                {
                    model: Asignacion,
                    attributes: ['id_ot']
                },
                {
                    model: Accion,
                    attributes: ['nombre_accion']
                },
                {
                    model: Trabajador,
                    attributes: ['nombre', 'apellido']
                }
            ]
        });
        
        if (historial) {
            res.json(historial);
        } else {
            res.status(404).json({
                msg: `No existe un registro de historial con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el registro de historial'
        });
    }
};

// Obtener historial por ID de OT
export const getHistorialPorOT = async (req: Request, res: Response) => {
    const { id_ot } = req.params;
    try {
        const historial = await HistorialOrden.findAll({
            where: { id_ot },
            include: [
                {
                    model: Accion,
                    attributes: ['nombre_accion']
                },
                {
                    model: Trabajador,
                    attributes: ['nombre', 'apellido']
                }
            ],
            order: [['fecha_cambio', 'DESC']]
        });
        res.json(historial);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el historial de la orden'
        });
    }
};

// Crear un nuevo registro en el historial
export const postHistorialOrden = async (req: Request, res: Response) => {
    const {
        id_ot,
        usuario_responsable,
        id_accion,
        descripcion,
        estado_anterior,
        estado_nuevo,
        id_trabajador_asignado
    } = req.body;

    try {
        const historial = await HistorialOrden.create({
            id_ot,
            fecha_cambio: new Date(),
            usuario_responsable,
            id_accion,
            descripcion,
            estado_anterior,
            estado_nuevo,
            id_trabajador_asignado
        });

        res.json(historial);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el registro de historial'
        });
    }
};

// Actualizar un registro del historial
export const updateHistorialOrden = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { descripcion } = req.body; // Solo permitimos actualizar la descripción

    try {
        const historial = await HistorialOrden.findByPk(id);
        if (!historial) {
            return res.status(404).json({
                msg: `No existe un registro de historial con el id ${id}`
            });
        }

        await historial.update({
            descripcion
        });
        res.json(historial);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el registro de historial'
        });
    }
};