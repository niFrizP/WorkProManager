import { Request, Response} from "express";
import { Op } from "sequelize";
import Trabajador from '../models/trabajador';
import TrabajadorRol from '../models/trabajador_rol';
import bcrypt from "bcrypt";
import { verificarToken, verificarRol } from '../middleware/autenticacion';

// Obtener todos los trabajadores activos
export const getTrabajadores = async (req: Request, res: Response) => {
    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para ver los trabajadores'
            });
        }

        const trabajadores = await Trabajador.findAll({
            where: { activo: true },
            attributes: { exclude: ['clave'] },
            include: [{
                model: TrabajadorRol,
                attributes: ['nom_rol']
            }],
            order: [['nom_trab', 'ASC']]
        });
        res.json(trabajadores);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener trabajadores'
        });
    }
};

// Obtener un trabajador por RUT
export const getTrabajador = async (req: Request, res: Response) => {
    const { rut } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) {
            return res.status(403).json({
                msg: 'No tiene permisos para ver este trabajador'
            });
        }

        const trabajador = await Trabajador.findByPk(rut, {
            attributes: { exclude: ['clave'] },
            include: [{
                model: TrabajadorRol,
                attributes: ['nom_rol']
            }]
        });

        if (!trabajador) {
            return res.status(404).json({
                msg: `No existe un trabajador con el RUT ${rut}`
            });
        }
        res.json(trabajador);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el trabajador'
        });
    }
};

// Crear un nuevo trabajador
export const postTrabajador = async (req: Request, res: Response) => {
    const { rut_trab, nom_trab, ape_trab, id_rol, clave, d_veri_trab } = req.body;

    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) {
            return res.status(403).json({
                msg: 'No tiene permisos para crear trabajadores'
            });
        }

        // Verificar si ya existe un trabajador con el mismo RUT
        const trabajadorExiste = await Trabajador.findOne({
            where: { rut_trab }
        });

        if (trabajadorExiste) {
            return res.status(400).json({
                msg: `Ya existe un trabajador con el RUT ${rut_trab}`
            });
        }

        // Verificar si existe el rol
        const rolExiste = await TrabajadorRol.findByPk(id_rol);
        if (!rolExiste) {
            return res.status(404).json({
                msg: `No existe un rol con el ID ${id_rol}`
            });
        }

        const hashedPassword = await bcrypt.hash(clave, 10);
        const nuevoTrabajador = await Trabajador.create({
            rut_trab,
            nom_trab,
            ape_trab,
            id_rol,
            clave: hashedPassword,
            d_veri_trab,
            activo: true
        });

        const { clave: _, ...trabajadorSinClave } = nuevoTrabajador.toJSON();
        res.json(trabajadorSinClave);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el trabajador'
        });
    }
};

// Actualizar un trabajador
export const updateTrabajador = async (req: Request, res: Response) => {
    const { rut } = req.params;
    const { nom_trab, ape_trab, id_rol, clave, d_veri_trab } = req.body;
    
    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) {
            return res.status(403).json({
                msg: 'No tiene permisos para actualizar trabajadores'
            });
        }

        const trabajador = await Trabajador.findByPk(rut);
        if (!trabajador) {
            return res.status(404).json({
                msg: `No existe un trabajador con el RUT ${rut}`
            });
        }

        const updateData: any = {
            nom_trab,
            ape_trab,
            id_rol,
            d_veri_trab
        };

        if (clave) {
            updateData.clave = await bcrypt.hash(clave, 10);
        }

        await trabajador.update(updateData);
        
        const { clave: _, ...trabajadorSinClave } = trabajador.toJSON();
        res.json(trabajadorSinClave);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar trabajador'
        });
    }
};

// Desactivar un trabajador
export const deleteTrabajador = async (req: Request, res: Response) => {
    const { rut } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) {
            return res.status(403).json({
                msg: 'No tiene permisos para eliminar trabajadores'
            });
        }

        const trabajador = await Trabajador.findByPk(rut);
        if (!trabajador) {
            return res.status(404).json({
                msg: `No existe un trabajador con el RUT ${rut}`
            });
        }

        await trabajador.update({ activo: false });
        res.json({
            msg: 'Trabajador desactivado exitosamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al desactivar trabajador'
        });
    }
};