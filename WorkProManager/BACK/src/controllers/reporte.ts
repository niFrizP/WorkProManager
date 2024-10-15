import { Request, Response } from 'express';
import Reporte from '../models/reporte';
import Usuario from '../models/usuario';
import Equipo from '../models/equipo';
import EstadoOT from '../models/estado_ot';
import Order from '../models/orders';


export const getReportes = async (req: Request, res: Response) => {
    try {
        const listReporte = await Reporte.findAll({
            include: [
                
                {
                    model: Usuario,
                    attributes: ['nom_usu'],
                    required: true
                },

               
            ]
        });

        console.log('Consulta de órdenes:', JSON.stringify(listReporte, null, 2)); // Log de la consulta
        res.json(listReporte);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            msg: 'Error fetching orders',
        });
    }
};




export const getReporte = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const reporte = await Reporte.findByPk(id, {
            include: [
                { model: Usuario },
            ]
        });

        if (reporte) {
            res.json(reporte);
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

export const deleteReporte = async (req: Request, res: Response) => {
    const { id } = req.params;
    const reporte = await Reporte.findByPk(id);

    if (!reporte) {
        res.status(404).json({
            msg: `No existe una orden con el id ${id}`
        })
    } else {
        await reporte.destroy();
        res.json({
            msg: 'La orden fue eliminado con exito!'
        })
    }

}

export const postReporte = async (req: Request, res: Response) => {
    const {  id_usuario, fecha, descripcion, id_ot } = req.body;

    try {
        const newReporte = await Reporte.create({
            fecha,
            descripcion,
            id_usuario,
            id_ot
        });

        res.json({
            msg: 'La orden fue agregada con éxito!',
            order: newReporte
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};



export const updateReporte = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const reporte = await Reporte.findByPk(id);

        if(reporte) {
            await reporte.update(body); // El body incluye ahora id_cliente, id_usuario, etc.
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


