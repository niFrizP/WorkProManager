import { Request, Response } from 'express';
import TrabajadorRol from '../models/trabajador_rol';
import Trabajador from '../models/trabajador';
import { verificarToken, verificarRol } from '../middleware/autenticacion';

// Obtener todos los roles de trabajador
export const getRoles = async (req: Request, res: Response) => {
    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para ver los roles'
            });
        }

        const roles = await TrabajadorRol.findAll({
            include: [{
                model: Trabajador,
                attributes: ['nom_trab', 'ape_trab']
            }]
        });
        res.json(roles);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener los roles de trabajador'
        });
    }
};

// Obtener un rol específico por ID
export const getRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para ver los roles'
            });
        }

        const rol = await TrabajadorRol.findByPk(id, {
            include: [{
                model: Trabajador,
                attributes: ['nom_trab', 'ape_trab']
            }]
        });

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
            msg: 'Error al obtener el rol'
        });
    }
};

// Crear un nuevo rol
export const postRol = async (req: Request, res: Response) => {
    const { nom_rol } = req.body;

    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para crear roles'
            });
        }

        // Verificar si ya existe un rol con el mismo nombre
        const rolExistente = await TrabajadorRol.findOne({
            where: { nom_rol }
        });

        if (rolExistente) {
            return res.status(400).json({
                msg: `Ya existe un rol con el nombre ${nom_rol}`
            });
        }

        const rol = await TrabajadorRol.create({
            nom_rol
        });

        res.json(rol);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el rol'
        });
    }
};

// Actualizar un rol
export const updateRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nom_rol } = req.body;

    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para actualizar roles'
            });
        }

        const rol = await TrabajadorRol.findByPk(id);
        if (!rol) {
            return res.status(404).json({
                msg: `No existe un rol con el id ${id}`
            });
        }

        // Verificar si ya existe otro rol con el mismo nombre
        const rolExistente = await TrabajadorRol.findOne({
            where: { nom_rol }
        });

        if (rolExistente && rolExistente.getDataValue('id_rol') !== Number(id)) {
            return res.status(400).json({
                msg: `Ya existe un rol con el nombre ${nom_rol}`
            });
        }

        await rol.update({
            nom_rol
        });

        res.json(rol);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el rol'
        });
    }
};

// Eliminar un rol
export const deleteRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para eliminar roles'
            });
        }

        const rol = await TrabajadorRol.findByPk(id);
        if (!rol) {
            return res.status(404).json({
                msg: `No existe un rol con el id ${id}`
            });
        }

        // Verificar si hay trabajadores asociados a este rol
        const trabajadoresAsociados = await Trabajador.count({
            where: { id_rol: id }
        });

        if (trabajadoresAsociados > 0) {
            return res.status(400).json({
                msg: 'No se puede eliminar el rol porque tiene trabajadores asociados'
            });
        }

        await rol.destroy();
        res.json({
            msg: 'Rol eliminado con éxito'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al eliminar el rol'
        });
    }
};

// Obtener trabajadores por rol
export const getTrabajadoresPorRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para ver los trabajadores por rol'
            });
        }

        const rol = await TrabajadorRol.findByPk(id, {
            include: [{
                model: Trabajador,
                attributes: ['rut_trab', 'nom_trab', 'ape_trab', 'email_trab']
            }]
        });

        if (!rol) {
            return res.status(404).json({
                msg: `No existe un rol con el id ${id}`
            });
        }

        res.json(rol.get('Trabajadors'));
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener los trabajadores del rol'
        });
    }
}; 