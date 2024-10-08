import { Request, Response } from 'express';
import EstadoOT from '../models/estado_ot'; // Asegúrate de tener el modelo de EstadoOT importado

export const getEstadosOT = async (req: Request, res: Response) => {
    const listEstadosOT = await EstadoOT.findAll();
    res.json(listEstadosOT);
};

export const getEstadoOT = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const estadoOT = await EstadoOT.findByPk(id);

        if (estadoOT) {
            res.json(estadoOT);
        } else {
            res.status(404).json({
                msg: `No existe un estado con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error al obtener el estado, contacta con soporte`
        });
    }
};

export const deleteEstadoOT = async (req: Request, res: Response) => {
    const { id } = req.params;
    const estadoOT = await EstadoOT.findByPk(id);

    if (!estadoOT) {
        res.status(404).json({
            msg: `No existe un estado con el id ${id}`
        });
    } else {
        await estadoOT.destroy();
        res.json({
            msg: 'El estado fue eliminado con éxito!'
        });
    }
};

export const postEstadoOT = async (req: Request, res: Response) => {
    const { tipo_est } = req.body; // Extrae los datos relevantes

    try {
        // Crear el nuevo estado sin especificar `id_estado`
        const newEstadoOT = await EstadoOT.create({
            tipo_est
        });

        res.json({
            msg: 'El estado fue agregado con éxito!',
            estado: newEstadoOT // Devuelve el nuevo estado, incluyendo el id_estado generado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};

export const updateEstadoOT = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const estadoOT = await EstadoOT.findByPk(id);

        if (estadoOT) {
            await estadoOT.update(body);
            res.json({
                msg: 'El estado fue actualizado con éxito'
            });
        } else {
            res.status(404).json({
                msg: `No existe un estado con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Upps, ocurrió un error. Comuníquese con soporte`
        });
    }
};
