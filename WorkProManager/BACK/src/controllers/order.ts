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
    const { fecha, equipo, estado, costo } = req.body; // Extrae los datos relevantes

    try {
        // Crear la nueva orden sin especificar `id_ot`
        const newOrder = await Order.create({
            fecha,
            equipo,
            estado,
            costo
        });

        res.json({
            msg: 'La orden fue agregada con éxito!',
            order: newOrder // Devuelve la nueva orden, incluyendo el id_ot generado
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
        await order.update(body);
        res.json({
            msg: 'La orden fue actualziado con exito'
        })

    } else {
        res.status(404).json({
            msg: `No existe una orden con el id ${id}`
        })
    }
        
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }

    
}