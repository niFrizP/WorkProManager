import { Request, Response } from 'express';
import Cliente from '../models/clientes';

export const getClientes = async (req: Request, res: Response) => {
    const listClientes = await Cliente.findAll()

    res.json(listClientes)
}

export const getCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.findByPk(id);

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
            msg: `Error al obtener el cliente, contacta con soporte`
        });
    }
};

export const deleteCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
        res.status(404).json({
            msg: `No existe un cliente con el id ${id}`
        })
    } else {
        await cliente.destroy();
        res.json({
            msg: 'El cliente fue eliminado con éxito!'
        })
    }
}

export const postCliente = async (req: Request, res: Response) => {
    const { rut_cliente, nombre, apellido, correo, celular, d_verificador_cliente} = req.body; // Extrae los datos relevantes

    try {
        // Crear el nuevo cliente sin especificar `id_cliente`
        const newCliente = await Cliente.create({
            rut_cliente,
            nombre,
            apellido,
            correo,
            celular,
            d_verificador_cliente
        });

        res.json({
            msg: 'El cliente fue agregado con éxito!',
            cliente: newCliente // Devuelve el nuevo cliente, incluyendo el id_cliente generado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};

export const updateCliente = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const cliente = await Cliente.findByPk(id);

        if (cliente) {
            await cliente.update(body);
            res.json({
                msg: 'El cliente fue actualizado con éxito'
            })

        } else {
            res.status(404).json({
                msg: `No existe un cliente con el id ${id}`
            })
        }

    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps, ocurrió un error. Comuníquese con soporte`
        })
    }
}
