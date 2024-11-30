import { Request, Response } from 'express';
import Servicio from '../models/servicio';
import { verificarToken, verificarRol } from '../middleware/autenticacion';

// Obtener todos los servicios activos
export const getServicios = async (req: Request, res: Response) => {
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const listServicios = await Servicio.findAll({
            where: { activo: true },
            attributes: ['id_serv', 'nom_serv', 'activo'],
            order: [['nom_serv', 'ASC']]
        });
        res.json(listServicios);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener los servicios'
        });
    }
};

// Obtener un servicio por ID
export const getServicio = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const servicio = await Servicio.findByPk(id);
        if (servicio) {
            res.json(servicio);
        } else {
            res.status(404).json({
                msg: `No existe un servicio con el ID ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el servicio'
        });
    }
};

// Crear un nuevo servicio
export const postServicio = async (req: Request, res: Response) => {
    const { nom_serv } = req.body;
    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para crear servicios'
            });
        }

        // Verificar si ya existe un servicio con el mismo nombre
        const servicioExiste = await Servicio.findOne({
            where: { nom_serv }
        });

        if (servicioExiste) {
            return res.status(400).json({
                msg: `Ya existe un servicio con el nombre ${nom_serv}`
            });
        }

        const servicio = await Servicio.create({
            nom_serv,
            activo: true
        });
        res.json(servicio);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el servicio'
        });
    }
};

// Actualizar un servicio
export const updateServicio = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nom_serv } = req.body;
    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para actualizar servicios'
            });
        }

        const servicio = await Servicio.findByPk(id);
        if (!servicio) {
            return res.status(404).json({
                msg: `No existe un servicio con el ID ${id}`
            });
        }

        // Verificar si el nuevo nombre ya existe en otro servicio
        if (nom_serv) {
            const servicioExiste = await Servicio.findOne({
                where: { nom_serv }
            });

            if (servicioExiste && servicioExiste.getDataValue('id_serv') !== parseInt(id)) {
                return res.status(400).json({
                    msg: `Ya existe un servicio con el nombre ${nom_serv}`
                });
            }
        }

        await servicio.update({ nom_serv });
        res.json(servicio);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el servicio'
        });
    }
};

// Desactivar un servicio (borrado lógico)
export const deleteServicio = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para eliminar servicios'
            });
        }

        const servicio = await Servicio.findByPk(id);
        if (!servicio) {
            return res.status(404).json({
                msg: `No existe un servicio con el ID ${id}`
            });
        }

        await servicio.update({ activo: false });
        res.json({
            msg: 'Servicio desactivado con éxito'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al desactivar el servicio'
        });
    }
};