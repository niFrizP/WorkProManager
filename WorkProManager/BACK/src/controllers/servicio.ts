import { Request, Response } from 'express';
import Servicio from '../models/servicio'; // Asegúrate de tener el modelo de Servicio importado

export const getServicios = async (req: Request, res: Response) => {
    const listServicios = await Servicio.findAll();
    res.json(listServicios);
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
            msg: `Error al obtener el servicio, contacta con soporte`
        });
    }
};

export const deleteServicio = async (req: Request, res: Response) => {
    const { id } = req.params;
    const servicio = await Servicio.findByPk(id);

    if (!servicio) {
        res.status(404).json({
            msg: `No existe un servicio con el id ${id}`
        });
    } else {
        await servicio.destroy();
        res.json({
            msg: 'El servicio fue eliminado con éxito!'
        });
    }
};

export const postServicio = async (req: Request, res: Response) => {
    const { nom_serv, precio } = req.body; // Extrae los datos relevantes

    try {
        // Crear el nuevo servicio sin especificar `id_servicio`
        const newServicio = await Servicio.create({
            nom_serv,
        });

        res.json({
            msg: 'El servicio fue agregado con éxito!',
            servicio: newServicio // Devuelve el nuevo servicio, incluyendo el id_servicio generado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};

export const updateServicio = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const servicio = await Servicio.findByPk(id);

        if (servicio) {
            await servicio.update(body);
            res.json({
                msg: 'El servicio fue actualizado con éxito'
            });
        } else {
            res.status(404).json({
                msg: `No existe un servicio con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Upps, ocurrió un error. Comuníquese con soporte`
        });
    }
};
