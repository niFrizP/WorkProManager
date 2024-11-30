import { Request, Response } from 'express';
import TrabajadorRol from '../models/trabajador_rol';

// Obtener todos los roles de los trabajadores
export const getTrabajadorRoles = async (req: Request, res: Response) => {
    try {
        const roles = await TrabajadorRol.findAll();
        res.json(roles);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener roles de trabajadores" });
    }
};

// Obtener un rol de trabajador por ID
export const getTrabajadorRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const rol = await TrabajadorRol.findByPk(id);
        if (rol) {
            res.json(rol);
        } else {
            res.status(404).json({ msg: `No existe un rol con el ID ${id}` });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener rol de trabajador" });
    }
};

// Crear un nuevo rol de trabajador
export const postTrabajadorRol = async (req: Request, res: Response) => {
    const { nom_rol } = req.body;
    try {
        const newRol = await TrabajadorRol.create({ nom_rol });
        res.json({
            msg: 'El rol fue creado con éxito!',
            rol: newRol // Devuelve el rol creado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al crear el rol de trabajador" });
    }
};

// Actualizar un rol de trabajador por ID
export const updateTrabajadorRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nom_rol } = req.body;
    try {
        const rol = await TrabajadorRol.findByPk(id);
        if (rol) {
            await rol.update({ nom_rol });
            res.json({ msg: "Rol de trabajador actualizado con éxito" });
        } else {
            res.status(404).json({ msg: "No existe un rol con ese ID" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al actualizar rol de trabajador" });
    }
};

// Eliminar un rol de trabajador por ID
export const deleteTrabajadorRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const rol = await TrabajadorRol.findByPk(id);
        if (rol) {
            await rol.destroy();
            res.json({ msg: "El rol fue eliminado con éxito!" });
        } else {
            res.status(404).json({ msg: `No existe un rol con el ID ${id}` });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al eliminar rol de trabajador" });
    }
};
