import { Request, Response } from 'express';
import Pago from '../models/pago';

export const getPagos = async (req: Request, res: Response) => {
    const listPagos = await Pago.findAll();
    res.json(listPagos);
}

export const getPago = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const pago = await Pago.findByPk(id);

        if (pago) {
            res.json(pago);
        } else {
            res.status(404).json({
                msg: `No existe un pago con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error al obtener el pago, contacta con soporte`
        });
    }
};

export const deletePago = async (req: Request, res: Response) => {
    const { id } = req.params;
    const pago = await Pago.findByPk(id);

    if (!pago) {
        res.status(404).json({
            msg: `No existe un pago con el id ${id}`
        });
    } else {
        await pago.destroy();
        res.json({
            msg: 'El pago fue eliminado con éxito!'
        });
    }
}

export const postPago = async (req: Request, res: Response) => {
    const { tipo_pago } = req.body; // Extrae los datos relevantes

    try {
        const newPago = await Pago.create({ tipo_pago });

        res.json({
            msg: 'El pago fue agregado con éxito!',
            pago: newPago // Devuelve el nuevo pago, incluyendo el id_pago generado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};

export const updatePago = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const pago = await Pago.findByPk(id);

        if (pago) {
            await pago.update(body);
            res.json({
                msg: 'El pago fue actualizado con éxito'
            });
        } else {
            res.status(404).json({
                msg: `No existe un pago con el id ${id}`
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Upps, ocurrió un error. Comuníquese con soporte`
        });
    }
};
