import { Request, Response } from 'express';
import Equipo from '../models/equipo';
import Marca from '../models/marca';
import { verificarToken, verificarRol } from '../middleware/autenticacion';

export const getEquipos = async (req: Request, res: Response) => {
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const listEquipos = await Equipo.findAll({
            include: [{
                model: Marca,
                attributes: ['nom_marca']
            }],
            attributes: [
                'num_ser',
                'tip_equ',
                'mod_equ',
                'id_marca'
            ]
        });
        res.json(listEquipos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener los equipos'
        });
    }
};

export const getEquipo = async (req: Request, res: Response) => {
    const { num_ser } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const equipo = await Equipo.findByPk(num_ser, {
            include: [{
                model: Marca,
                attributes: ['nom_marca']
            }]
        });
        
        if (equipo) {
            res.json(equipo);
        } else {
            res.status(404).json({
                msg: `No existe un equipo con el número de serie ${num_ser}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el equipo'
        });
    }
};

export const postEquipo = async (req: Request, res: Response) => {
    const { 
        num_ser,
        tip_equ, 
        mod_equ, 
        id_marca 
    } = req.body;

    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1, 2])) { // Solo admin y gestor
            return res.status(403).json({
                msg: 'No tiene permisos para crear equipos'
            });
        }

        // Verificar si ya existe el equipo
        const equipoExiste = await Equipo.findByPk(num_ser);
        if (equipoExiste) {
            return res.status(400).json({
                msg: `Ya existe un equipo con el número de serie ${num_ser}`
            });
        }

        // Verificar si existe la marca
        if (id_marca) {
            const marcaExiste = await Marca.findByPk(id_marca);
            if (!marcaExiste) {
                return res.status(404).json({
                    msg: `No existe una marca con el ID ${id_marca}`
                });
            }
        }

        const equipo = await Equipo.create({
            num_ser,
            tip_equ,
            mod_equ,
            id_marca
        });
        res.json(equipo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el equipo'
        });
    }
};

export const updateEquipo = async (req: Request, res: Response) => {
    const { num_ser } = req.params;
    const { 
        tip_equ, 
        mod_equ, 
        id_marca 
    } = req.body;

    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1, 2])) {
            return res.status(403).json({
                msg: 'No tiene permisos para actualizar equipos'
            });
        }

        const equipo = await Equipo.findByPk(num_ser);
        if (!equipo) {
            return res.status(404).json({
                msg: `No existe un equipo con el número de serie ${num_ser}`
            });
        }

        // Verificar si existe la marca
        if (id_marca) {
            const marcaExiste = await Marca.findByPk(id_marca);
            if (!marcaExiste) {
                return res.status(404).json({
                    msg: `No existe una marca con el ID ${id_marca}`
                });
            }
        }

        await equipo.update({
            tip_equ,
            mod_equ,
            id_marca
        });
        res.json(equipo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el equipo'
        });
    }
};

export const deleteEquipo = async (req: Request, res: Response) => {
    const { num_ser } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para eliminar equipos'
            });
        }

        const equipo = await Equipo.findByPk(num_ser);
        if (!equipo) {
            return res.status(404).json({
                msg: `No existe un equipo con el número de serie ${num_ser}`
            });
        }

        await equipo.destroy();
        res.json({
            msg: 'Equipo eliminado con éxito'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al eliminar el equipo'
        });
    }
};