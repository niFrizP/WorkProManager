import { Request, Response } from "express";
import Trabajador from "../models/trabajador"; // Asegúrate de importar el modelo correcto
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import TrabajadorRol from "../models/trabajador_rol";
import { where } from "sequelize";

// Obtener todos los trabajadores
export const getTrabajadores = async (req: Request, res: Response) => {
    try {
        const listTrabajadores = await Trabajador.findAll();
        res.json(listTrabajadores);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener trabajadores" });
    }
};


// Obtener todos los trabajadores con rol 2, de técnico
export const getTecnicos = async (req: Request, res: Response) => {
    try {
        const listTrabajadores = await Trabajador.findAll({
            where: {
                id_rol: 2
            }
        });
        res.json(listTrabajadores);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener trabajadores" });
    }
};

// Obtener un trabajador por ID
export const getTrabajador = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Realizando el join entre Trabajador y TrabajadorRol
        const trabajador = await Trabajador.findByPk(id, {
            include: [{
                model: TrabajadorRol,
                attributes: ['nom_rol'],  // Solo traemos el campo nom_rol
            }]
        });

        if (trabajador) {
            res.json(trabajador);
        } else {
            res.status(404).json({ msg: `No existe un trabajador con ese ID ${id}` });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener trabajador" });
    }
};


// Eliminar un trabajador por ID
export const deleteTrabajador = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const trabajador = await Trabajador.findByPk(id);
        if (!trabajador) {
            res.status(404).json({ msg: `No existe un trabajador con el id ${id}` });
        } else {
            await trabajador.destroy();
            res.json({ msg: "El trabajador fue eliminado con éxito!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al eliminar trabajador" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { rut_trab, clave } = req.body;

        // Verificar si el usuario existe
        const trabajador: any = await Trabajador.findByPk(rut_trab);

        if (!trabajador) {
            res.status(400).json({
                msg: `No existe un usuario con el RUT ${rut_trab} en la base de datos.`,
            });
        } else {
            // Verificar contraseña
            const passwordValid = await bcrypt.compare(clave, trabajador.clave);
            if (!passwordValid) {
                res.status(400).json({
                    msg: `Contraseña incorrecta.`,
                });
            } else {
                // Generar token
                const token = jwt.sign(
                    { rut_trab: trabajador.rut_trab },
                    process.env['SECRET_KEY'] || 'pepito123',  // Aquí se cambia la notación
                    { expiresIn: '1h' }
                );

                // Almacenar el token en una cookie segura
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env['NODE_ENV'] === 'production',  // Aquí se cambia la notación
                    sameSite: 'strict',
                    maxAge: 60 * 60 * 1000,  // 1 hora
                });

                // Enviar respuesta una sola vez
                res.json({ msg: 'Inicio de sesión exitoso.' });
            }
        }
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({
            msg: 'Ocurrió un error inesperado.',
        });
    }
};


// Crear un nuevo trabajador
export const postTrabajador = async (req: Request, res: Response) => {
    const { rut_trab, d_veri_trab, nom_trab, ape_trab, clave, id_rol, activo } = req.body;
    try {
        // Validamos si el trabajador ya existe en la base de datos

        // Si no existe, encriptamos la clave
        const hashedPassword = await bcrypt.hash(clave, 10);

        // Crear el nuevo trabajador
        const newTrabajador = await Trabajador.create({
            rut_trab,
            d_veri_trab,
            nom_trab,
            ape_trab,
            clave: hashedPassword,
            id_rol,
            activo: activo || true // Asignar valor por defecto si no se proporciona
        });

        // Devolver respuesta exitosa
        res.json({
            msg: 'El trabajador fue agregado con éxito!',
            trabajador: newTrabajador // Devuelve el nuevo trabajador, incluyendo el `rut_trab` generado
        });
    } catch (error) {
        console.log(error);
        // Devolver respuesta de error general
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte.'
        });
    }
};


// Actualizar un trabajador por ID
export const updateTrabajador = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    try {
        const trabajador = await Trabajador.findByPk(id);
        if (trabajador) {
            await trabajador.update(body);
            res.json({ msg: "Trabajador actualizado con éxito" });
        } else {
            res.status(404).json({ msg: "No existe un trabajador con ese ID" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al actualizar trabajador" });
    }
};
