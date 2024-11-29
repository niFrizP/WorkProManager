import { Request, Response } from 'express';
import EstadoOT from '../models/estado_ot';

// Obtener todos los estados de OT
export const getEstadosOT = async (req: Request, res: Response) => {
    try {
        const listEstados = await EstadoOT.findAll({
            attributes: ['id_estado', 'nom_estado']
        });
        res.json(listEstados);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener los estados de OT'
        });
    }
};

// Obtener un estado de OT por ID
export const getEstadoOT = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const estado = await EstadoOT.findByPk(id, {
            attributes: ['id_estado', 'nom_estado']
        });
        if (estado) {
            res.json(estado);
        } else {
            res.status(404).json({
                msg: `No existe un estado de OT con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el estado de OT'
        });
    }
};

// Crear un nuevo estado de OT
export const postEstadoOT = async (req: Request, res: Response) => {
    const { nom_estado } = req.body;
    try {
        // Verificar que el estado sea uno de los permitidos
        if (!['Pendiente', 'En Proceso', 'Completada', 'Cancelada'].includes(nom_estado)) {
            return res.status(400).json({
                msg: 'Estado no válido. Los estados permitidos son: Pendiente, En Proceso, Completada, Cancelada'
            });
        }

        const estado = await EstadoOT.create({
            nom_estado
        });
        res.json(estado);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el estado de OT'
        });
    }
};

// Actualizar un estado de OT
export const updateEstadoOT = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nom_estado } = req.body;
    try {
        const estado = await EstadoOT.findByPk(id);
        if (!estado) {
            return res.status(404).json({
                msg: `No existe un estado de OT con el id ${id}`
            });
        }

        // Verificar que el estado sea uno de los permitidos
        if (!['Pendiente', 'En Proceso', 'Completada', 'Cancelada'].includes(nom_estado)) {
            return res.status(400).json({
                msg: 'Estado no válido. Los estados permitidos son: Pendiente, En Proceso, Completada, Cancelada'
            });
        }

        await estado.update({
            nom_estado
        });
        res.json(estado);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el estado de OT'
        });
    }
};

// Eliminar un estado de OT
export const deleteEstadoOT = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const estado = await EstadoOT.findByPk(id);
        if (!estado) {
            return res.status(404).json({
                msg: `No existe un estado de OT con el id ${id}`
            });
        }

        await estado.destroy();
        res.json({
            msg: 'Estado de OT eliminado con éxito'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al eliminar el estado de OT'
        });
    }
}; 