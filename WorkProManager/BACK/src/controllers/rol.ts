import { Request, Response } from 'express';
import Rol from '../models/rol';

export const getRoles = async (req: Request, res: Response) => {
    const listRoles = await Rol.findAll();
    res.json(listRoles);
};

export const getRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const rol = await Rol.findByPk(id);
        if (rol) {
            res.json(rol);
        } else {
            res.status(404).json({
                msg: `No existe un rol con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error al obtener el rol, contacta con soporte`
        });
    }
};

export const deleteRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const rol = await Rol.findByPk(id);
    
    if (!rol) {
        res.status(404).json({
            msg: `No existe un rol con el id ${id}`
        });
    } else {
        await rol.destroy();
        res.json({
            msg: 'El rol fue eliminado con éxito!'
        });
    }
};

export const postRol = async (req: Request, res: Response) => {
    const { rol } = req.body; // Extrae el rol

    try {
        const newRol = await Rol.create({
            rol
        });

        res.json({
            msg: 'El rol fue agregado con éxito!',
            rol: newRol // Devuelve el nuevo rol, incluyendo el id_rol generado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};

export const updateRol = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const rol = await Rol.findByPk(id);
        if (rol) {
            await rol.update(body);
            res.json({
                msg: 'El rol fue actualizado con éxito'
            });
        } else {
            res.status(404).json({
                msg: `No existe un rol con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps, ocurrió un error. Comuníquese con soporte`
        });
    }
};
