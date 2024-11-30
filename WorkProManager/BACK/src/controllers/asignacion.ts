import { Request, Response } from 'express';
import Asignacion from '../models/asignacion';
import Trabajador from '../models/trabajador';
import { verificarToken, verificarRol } from '../middleware/autenticacion';


export const getAsignaciones = async (req: Request, res: Response) => {
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const listAsignaciones = await Asignacion.findAll({
            include: [
                { 
                    model: Trabajador,
                    as: 'Tecnico',
                    attributes: ['rut_trab', 'nom_trab', 'ape_trab']
                },
                {
                    model: Trabajador,
                    as: 'Gestor',
                    attributes: ['rut_trab', 'nom_trab', 'ape_trab']
                }
            ],
            order: [['fecha_asig', 'DESC']]
        });
        res.json(listAsignaciones);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener las asignaciones'
        });
    }
};

export const getAsignacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const asignacion = await Asignacion.findByPk(id, {
            include: [
                { 
                    model: Trabajador,
                    as: 'Tecnico',
                    attributes: ['rut_trab', 'nom_trab', 'ape_trab']
                },
                {
                    model: Trabajador,
                    as: 'Gestor',
                    attributes: ['rut_trab', 'nom_trab', 'ape_trab']
                }
            ]
        });
        
        if (!asignacion) {
            return res.status(404).json({
                msg: `No existe una asignación con el id ${id}`
            });
        }
        res.json(asignacion);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener la asignación'
        });
    }
};

export const postAsignacion = async (req: Request, res: Response) => {
    const { rut_tec, rut_ges, notas_asig } = req.body;
    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1, 2])) { // Solo admin y gestor
            return res.status(403).json({
                msg: 'No tiene permisos para crear asignaciones'
            });
        }

        // Validar que existan los trabajadores
        const tecnico = await Trabajador.findByPk(rut_tec);
        const gestor = await Trabajador.findByPk(rut_ges);

        if (!tecnico || !gestor) {
            return res.status(400).json({
                msg: 'Técnico o gestor no encontrado'
            });
        }

        const asignacion = await Asignacion.create({
            rut_tec,
            rut_ges,
            fecha_asig: new Date(),
            notas_asig,
            es_actual: true
        });

        res.json(asignacion);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear la asignación'
        });
    }
};

export const updateAsignacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { rut_tec, notas_asig, es_actual } = req.body;
    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1, 2])) {
            return res.status(403).json({
                msg: 'No tiene permisos para actualizar asignaciones'
            });
        }

        const asignacion = await Asignacion.findByPk(id);
        if (!asignacion) {
            return res.status(404).json({
                msg: `No existe una asignación con el id ${id}`
            });
        }

        if (rut_tec) {
            const tecnico = await Trabajador.findByPk(rut_tec);
            if (!tecnico) {
                return res.status(400).json({
                    msg: 'Técnico no encontrado'
                });
            }
        }

        await asignacion.update({
            rut_tec,
            notas_asig,
            es_actual
        });
        res.json(asignacion);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar la asignación'
        });
    }
};

export const deleteAsignacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para eliminar asignaciones'
            });
        }

        const asignacion = await Asignacion.findByPk(id);
        if (!asignacion) {
            return res.status(404).json({
                msg: `No existe una asignación con el id ${id}`
            });
        }

        await asignacion.destroy();
        res.json({
            msg: 'Asignación eliminada con éxito'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al eliminar la asignación'
        });
    }
};