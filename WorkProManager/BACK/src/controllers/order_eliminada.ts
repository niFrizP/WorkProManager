import { Request, Response } from 'express';
import Equipo from '../models/equipo';
import Cliente from '../models/cliente';
import Usuario from '../models/usuario';
import Servicio from '../models/servicio';
import EstadoOT from '../models/estado_ot';
import OrderEliminada from '../models/order_eliminada';


export const getOrders = async (req: Request, res: Response) => {
    try {
        const listOrders = await OrderEliminada.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ['nombre'],
                    required: true
                },
                {
                    model: Servicio,
                    attributes: ['nom_serv'],
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
                    attributes: ['tipo_est'],
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
        const orderEliminada = await OrderEliminada.findByPk(id, {
            include: [
                { model: Equipo },
                { model: Cliente },
                { model: Usuario },
                { model: Servicio },
                { model: EstadoOT }
            ]
        });

        if (orderEliminada) {
            res.json(orderEliminada);
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
    const orderEliminada = await OrderEliminada.findByPk(id);

    if (!orderEliminada) {
        res.status(404).json({
            msg: `No existe una orden con el id ${id}`
        })
    } else {
        await orderEliminada.destroy();
        res.json({
            msg: 'La orden fue eliminado con exito!'
        })
    }

}

export const postOrder = async (req: Request, res: Response) => {
    const { id_ot ,fecha, costo, descripcion, rut_cliente, id_usuario, id_serv, num_equipo,id_estado } = req.body;

    try {
        const newOrder = await OrderEliminada.create({
            id_ot,
            fecha,
            costo, 
            descripcion,
            rut_cliente, // Incluye id_cliente en la creación
            id_usuario, // Incluye id_usuario
            id_serv,    // Incluye id_serv
            num_equipo,  // Incluye num_equipo
            id_estado
        });

        res.json({
            msg: 'La orden fue agregada con éxito!',
            OrderEliminada: newOrder
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};



export const updateOrder = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const orderEliminada = await OrderEliminada.findByPk(id);

        if(orderEliminada) {
            await orderEliminada.update(body); // El body incluye ahora id_cliente, id_usuario, etc.
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


