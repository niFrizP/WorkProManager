import { Request, Response } from 'express';
import Cliente from '../models/cliente';

// Obtener todos los clientes
export const getClientes = async (req: Request, res: Response) => {
    try {
        const listClientes = await Cliente.findAll({
            attributes: [
                'id_cliente',
                'nombre_cliente',
                'direccion_cliente',
                'telefono_cliente',
                'email_cliente'
            ]
        });
        res.json(listClientes);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener los clientes'
        });
    }
};

// Obtener un cliente por ID
export const getCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.findByPk(id, {
            attributes: [
                'id_cliente',
                'nombre_cliente',
                'direccion_cliente',
                'telefono_cliente',
                'email_cliente'
            ]
        });
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({
                msg: `No existe un cliente con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el cliente'
        });
    }
};

// Crear un nuevo cliente
export const postCliente = async (req: Request, res: Response) => {
    const { 
        nombre_cliente, 
        direccion_cliente, 
        telefono_cliente, 
        email_cliente 
    } = req.body;

    try {
        const cliente = await Cliente.create({
            nombre_cliente,
            direccion_cliente,
            telefono_cliente,
            email_cliente
        });
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el cliente'
        });
    }
};

// Actualizar un cliente
export const updateCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { 
        nombre_cliente, 
        direccion_cliente, 
        telefono_cliente, 
        email_cliente 
    } = req.body;

    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({
                msg: `No existe un cliente con el id ${id}`
            });
        }

        await cliente.update({
            nombre_cliente,
            direccion_cliente,
            telefono_cliente,
            email_cliente
        });
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el cliente'
        });
    }
};

// Eliminar un cliente
export const deleteCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({
                msg: `No existe un cliente con el id ${id}`
            });
        }

        await cliente.destroy();
        res.json({
            msg: 'Cliente eliminado con éxito'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al eliminar el cliente'
        });
    }
};
