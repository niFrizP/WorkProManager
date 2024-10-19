import { Request, Response } from 'express';
import Order from '../models/orders';
import Equipo from '../models/equipo';
import Cliente from '../models/cliente';
import Usuario from '../models/usuario';
import Servicio from '../models/servicio';
import EstadoOT from '../models/estado_ot';


export const getOrders = async (req: Request, res: Response) => {
    try {
        const listOrders = await Order.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli'],
                    required: true
                },
                {
                    model: Usuario,
                    attributes: ['nom_usu'],
                    required: true
                },
                {
                    model: Equipo,
                    attributes: ['mod_equipo'],
                    required: true
                },
                {
                    model: EstadoOT,
                    attributes: ['nom_estado_ot'],
                    required: true
                }
            ]
        });

        console.log('Consulta de órdenes:', JSON.stringify(listOrders, null, 2)); // Log de la consulta
        res.json(listOrders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            msg: 'Error fetching orders',
        });
    }
};



export const getOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id, {
            include: [
                { model: Equipo },
                { model: Cliente },
                { model: Usuario },
                { model: EstadoOT }
            ]
        });

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({
                msg: `No existe una orden con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error al obtener la orden, contacta con soporte`
        });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
        res.status(404).json({
            msg: `No existe una orden con el id ${id}`
        })
    } else {
        await order.destroy();
        res.json({
            msg: 'La orden fue eliminado con exito!'
        })
    }

}

export const postOrder = async (req: Request, res: Response) => {
    const { fec_creacion, fec_entrega, descripcion, rut_cliente, rut_usuario, num_equipo,id_estado_ot } = req.body;

    try {
        const newOrder = await Order.create({
            fec_creacion,
            fec_entrega,
            descripcion,
            rut_cliente, // Incluye id_cliente en la creación
            rut_usuario, // Incluye rut_usuario
            num_equipo,  // Incluye num_equipo
            id_estado_ot
        });

        res.json({
            msg: 'La orden fue agregada con éxito!',
            order: newOrder
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};


export const updateOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { fec_creacion, fec_entrega, descripcion, rut_cliente, rut_usuario, num_equipo, id_estado_ot } = req.body; // Obtener los campos del cuerpo de la solicitud

    try {
        const order = await Order.findByPk(id); // Buscar la orden por ID

        if (order) {
            // Actualizar los campos del modelo
            await order.update({
                fec_creacion,
                fec_entrega,
                descripcion,
                rut_cliente,
                rut_usuario,
                num_equipo,
                id_estado_ot
            }); // Actualiza todos los campos proporcionados
            res.json({
                msg: 'La orden fue actualizada con éxito'
            });
        } else {
            res.status(404).json({
                msg: `No existe una orden con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};



