import { Request, Response} from "express";
import { Op } from "sequelize";
import Trabajador from '../models/trabajador';
import bcrypt from "bcrypt";

export const getTrabajadores = async (req: Request, res: Response) => {
    try {
        const trabajadores = await Trabajador.findAll({
            where: { activo: true },
            attributes: { exclude: ['clave'] } // Excluir la contraseña de la respuesta
        });
        res.json(trabajadores);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener trabajadores',
            error
        });
    }
};

export const getTrabajador = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const trabajador = await Trabajador.findByPk(id, {
            attributes: { exclude: ['clave'] } // Excluir la contraseña de la respuesta
        });
        if (!trabajador) {
            return res.status(404).json({
                msg: `No existe un trabajador con el id ${id}`
            });
        }
        res.json(trabajador);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener el trabajador',
            error
        });
    }
};

export const deleteTrabajador = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const trabajador = await Trabajador.findByPk(id);
        if (!trabajador) {
            return res.status(404).json({
                msg: `No existe un trabajador con el id ${id}`
            });
        }
        // Eliminación lógica actualizando el campo 'activo' a false
        await trabajador.update({ activo: false });
        res.json({
            msg: 'Trabajador eliminado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al eliminar trabajador',
            error
        });
    }
};

export const postTrabajador = async (req: Request, res: Response) => {
    const { password, ...restBody } = req.body;

    try {
        // Verificar si ya existe un trabajador con el mismo email o RUT
        const existingTrabajador = await Trabajador.findOne({
            where: {
                [Op.or]: [
                    { email_trabajador: restBody.email_trabajador },
                    { rut_trabajador: restBody.rut_trabajador }
                ]
            }
        });

        if (existingTrabajador) {
            return res.status(400).json({
                msg: 'Ya existe un trabajador con ese email o RUT'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoTrabajador = await Trabajador.create({
            ...restBody,
            password: hashedPassword
        });

        // Excluir password de la respuesta
        const { password: _, ...trabajadorSinPassword } = nuevoTrabajador.toJSON();

        res.json({
            msg: 'Trabajador creado exitosamente',
            trabajador: trabajadorSinPassword
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al crear el trabajador',
            error
        });
    }
};

export const updateTrabajador = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { password, ...restBody } = req.body;
    
    try {
        const trabajador = await Trabajador.findByPk(id);
        if (!trabajador) {
            return res.status(404).json({
                msg: `No existe un trabajador con el id ${id}`
            });
        }

        // Si se está actualizando el email o RUT, verificar que no exista otro trabajador con esos datos
        if (restBody.email_trabajador || restBody.rut_trabajador) {
            const whereConditions = [];
            if (restBody.email_trabajador) {
                whereConditions.push({ email_trabajador: restBody.email_trabajador });
            }
            if (restBody.rut_trabajador) {
                whereConditions.push({ rut_trabajador: restBody.rut_trabajador });
            }

            const existingTrabajador = await Trabajador.findOne({
                where: {
                    [Op.or]: whereConditions,
                    id_trabajador: { [Op.ne]: id }
                }
            });

            if (existingTrabajador) {
                return res.status(400).json({
                    msg: 'Ya existe otro trabajador con ese email o RUT'
                });
            }
        }

        const updateData = { ...restBody };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        await trabajador.update(updateData);
        
        // Excluir password de la respuesta
        const { password: _, ...trabajadorSinPassword } = trabajador.toJSON();

        res.json({
            msg: 'Trabajador actualizado exitosamente',
            trabajador: trabajadorSinPassword
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al actualizar trabajador',
            error
        });
    }
};