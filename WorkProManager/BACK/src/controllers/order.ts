import { Request, Response } from 'express';
import Order from '../models/orders';

export const getOrders = async (req: Request, res: Response) => {
    const listOrders = await Order.findAll()

    res.json(listOrders)
}

export const getOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);

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
    const { fecha, costo, descripcion, rut_cliente, id_usuario, id_serv, num_equipo,id_estado } = req.body;

    try {
        const newOrder = await Order.create({
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
    const { body } = req;
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id);

        if(order) {
            await order.update(body); // El body incluye ahora id_cliente, id_usuario, etc.
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
