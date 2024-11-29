import { Request, Response } from 'express';
import Equipo from '../models/equipo';
import Cliente from '../models/cliente';

// Obtener todos los equipos
export const getEquipos = async (req: Request, res: Response) => {
    try {
        const listEquipos = await Equipo.findAll({
            include: [{
                model: Cliente,
                attributes: ['nombre_cliente']
            }],
            attributes: [
                'numero_serie',
                'tipo_equipo',
                'marca',
                'modelo',
                'id_cliente'
            ]
        });
        res.json(listEquipos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener los equipos'
        });
    }
};

// Obtener un equipo por número de serie
export const getEquipo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const equipo = await Equipo.findByPk(id, {
            include: [{
                model: Cliente,
                attributes: ['nombre_cliente']
            }]
        });
        if (equipo) {
            res.json(equipo);
        } else {
            res.status(404).json({
                msg: `No existe un equipo con el número de serie ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el equipo'
        });
    }
};

// Crear un nuevo equipo
export const postEquipo = async (req: Request, res: Response) => {
    const { 
        tipo_equipo, 
        marca, 
        modelo, 
        id_cliente 
    } = req.body;

    try {
        // Verificar si el cliente existe
        const clienteExiste = await Cliente.findByPk(id_cliente);
        if (!clienteExiste) {
            return res.status(404).json({
                msg: `No existe un cliente con el ID ${id_cliente}`
            });
        }

        const equipo = await Equipo.create({
            tipo_equipo,
            marca,
            modelo,
            id_cliente
        });
        res.json(equipo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el equipo'
        });
    }
};

// Actualizar un equipo
export const updateEquipo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { 
        tipo_equipo, 
        marca, 
        modelo, 
        id_cliente 
    } = req.body;

    try {
        const equipo = await Equipo.findByPk(id);
        if (!equipo) {
            return res.status(404).json({
                msg: `No existe un equipo con el número de serie ${id}`
            });
        }

        // Verificar si el nuevo cliente existe (si se está actualizando)
        if (id_cliente) {
            const clienteExiste = await Cliente.findByPk(id_cliente);
            if (!clienteExiste) {
                return res.status(404).json({
                    msg: `No existe un cliente con el ID ${id_cliente}`
                });
            }
        }

        await equipo.update({
            tipo_equipo,
            marca,
            modelo,
            id_cliente
        });
        res.json(equipo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el equipo'
        });
    }
};

// Eliminar un equipo
export const deleteEquipo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const equipo = await Equipo.findByPk(id);
        if (!equipo) {
            return res.status(404).json({
                msg: `No existe un equipo con el número de serie ${id}`
            });
        }

        await equipo.destroy();
        res.json({
            msg: 'Equipo eliminado con éxito'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al eliminar el equipo'
        });
    }
};
