import { Request, Response } from 'express';
import Asignacion from '../models/asignacion';
import Trabajador from '../models/trabajador';

// Obtener todas las asignaciones
export const getAsignaciones = async (req: Request, res: Response) => {
    try {
        const listAsignaciones = await Asignacion.findAll({
            include: [
                { 
                    model: Trabajador,
                    as: 'Trabajador',
                    attributes: ['nombre', 'apellido']
                },
                {
                    model: Trabajador,
                    as: 'AsignadoPor',
                    attributes: ['nombre', 'apellido']
                }
            ]
        });
        res.json(listAsignaciones);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener las asignaciones'
        });
    }
};

// Obtener una asignación por ID
export const getAsignacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const asignacion = await Asignacion.findByPk(id, {
            include: [
                { 
                    model: Trabajador,
                    as: 'Trabajador',
                    attributes: ['nombre', 'apellido']
                },
                {
                    model: Trabajador,
                    as: 'AsignadoPor',
                    attributes: ['nombre', 'apellido']
                }
            ]
        });
        if (asignacion) {
            res.json(asignacion);
        } else {
            res.status(404).json({
                msg: `No existe una asignación con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener la asignación'
        });
    }
};

// Crear una nueva asignación
export const postAsignacion = async (req: Request, res: Response) => {
    const { id_ot, id_trabajador, asignado_por, notas } = req.body;
    try {
        const asignacion = await Asignacion.create({
            id_ot,
            id_trabajador,
            asignado_por,
            fecha_asignacion: new Date(),
            notas
        });
        res.json(asignacion);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear la asignación'
        });
    }
};

// Actualizar una asignación
export const updateAsignacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id_trabajador, notas, fecha_finalizacion } = req.body;
    try {
        const asignacion = await Asignacion.findByPk(id);
        if (!asignacion) {
            return res.status(404).json({
                msg: `No existe una asignación con el id ${id}`
            });
        }
        await asignacion.update({
            id_trabajador,
            notas,
            fecha_finalizacion
        });
        res.json(asignacion);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar la asignación'
        });
    }
};

// Eliminar una asignación
export const deleteAsignacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const asignacion = await Asignacion.findByPk(id);
        if (!asignacion) {
            return res.status(404).json({
                msg: `No existe una asignación con el id ${id}`
            });
        }
        await asignacion.destroy();
        res.json({
            msg: 'Asignación eliminada con éxito'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al eliminar la asignación'
        });
    }
}; 