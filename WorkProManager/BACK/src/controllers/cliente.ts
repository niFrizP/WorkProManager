import { Request, Response } from 'express';
import Cliente from '../models/cliente';
import { verificarToken, verificarRol } from '../middleware/autenticacion';


export const getClientes = async (req: Request, res: Response) => {
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const listClientes = await Cliente.findAll({
            attributes: [
                'rut_cli',
                'nom_cli',
                'ape_cli',
                'dir_cli',
                'tel_cli',
                'email_cli',
                'd_ver_cli'
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

export const getCliente = async (req: Request, res: Response) => {
    const { rut } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const cliente = await Cliente.findByPk(rut);
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({
                msg: `No existe un cliente con el RUT ${rut}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el cliente'
        });
    }
};

export const postCliente = async (req: Request, res: Response) => {
    const { 
        rut_cli,
        nom_cli,
        ape_cli,
        dir_cli,
        tel_cli,
        email_cli,
        d_ver_cli
    } = req.body;

    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1, 2])) { // Solo admin y gestor
            return res.status(403).json({
                msg: 'No tiene permisos para crear clientes'
            });
        }

        // Verificar si ya existe el cliente
        const clienteExistente = await Cliente.findByPk(rut_cli);
        if (clienteExistente) {
            return res.status(400).json({
                msg: `Ya existe un cliente con el RUT ${rut_cli}`
            });
        }

        const cliente = await Cliente.create({
            rut_cli,
            nom_cli,
            ape_cli,
            dir_cli,
            tel_cli,
            email_cli,
            d_ver_cli
        });
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el cliente'
        });
    }
};

export const updateCliente = async (req: Request, res: Response) => {
    const { rut } = req.params;
    const { 
        nom_cli,
        ape_cli,
        dir_cli,
        tel_cli,
        email_cli,
        d_ver_cli
    } = req.body;

    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1, 2])) {
            return res.status(403).json({
                msg: 'No tiene permisos para actualizar clientes'
            });
        }

        const cliente = await Cliente.findByPk(rut);
        if (!cliente) {
            return res.status(404).json({
                msg: `No existe un cliente con el RUT ${rut}`
            });
        }

        await cliente.update({
            nom_cli,
            ape_cli,
            dir_cli,
            tel_cli,
            email_cli,
            d_ver_cli
        });
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el cliente'
        });
    }
};

export const deleteCliente = async (req: Request, res: Response) => {
    const { rut } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para eliminar clientes'
            });
        }

        const cliente = await Cliente.findByPk(rut);
        if (!cliente) {
            return res.status(404).json({
                msg: `No existe un cliente con el RUT ${rut}`
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