import { Request, Response } from 'express';
import Servicio from '../models/servicio';

export const getServicios = async (req: Request, res: Response) => {
    try {
        const listServicios = await Servicio.findAll({
            where: { activo: true }
        });
        res.json(listServicios);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener los servicios'
        });
    }
};

export const getServicio = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const servicio = await Servicio.findByPk(id);
        if (servicio) {
            res.json(servicio);
        } else {
            res.status(404).json({
                msg: `No existe un servicio con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el servicio'
        });
    }
};

export const postServicio = async (req: Request, res: Response) => {
    const { nombre_servicio, descripcion_servicio } = req.body;
    try {
        const servicio = await Servicio.create({
            nombre_servicio,
            descripcion_servicio,
            activo: true
        });
        res.json(servicio);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el servicio'
        });
    }
};

export const updateServicio = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre_servicio, descripcion_servicio } = req.body;
    try {
        const servicio = await Servicio.findByPk(id);
        if (!servicio) {
            return res.status(404).json({
                msg: `No existe un servicio con el id ${id}`
            });
        }
        await servicio.update({
            nombre_servicio,
            descripcion_servicio
        });
        res.json(servicio);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el servicio'
        });
    }
};

export const deleteServicio = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const servicio = await Servicio.findByPk(id);
        if (!servicio) {
            return res.status(404).json({
                msg: `No existe un servicio con el id ${id}`
            });
        }
        await servicio.update({ activo: false });
        res.json({
            msg: 'Servicio eliminado con éxito'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al eliminar el servicio'
        });
    }
};