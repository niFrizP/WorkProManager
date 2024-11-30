import { Request, Response } from 'express';
import HistorialServicioOrden from '../models/historial_servicio_orden';
import OrdenTrabajo from '../models/orden_trabajo';
import { verificarToken, verificarRol } from '../middleware/autenticacion';

export const getHistorialServicios = async (req: Request, res: Response) => {
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const historial = await HistorialServicioOrden.findAll({
            include: [{
                model: OrdenTrabajo,
                attributes: ['id_ot']
            }],
            order: [['fecha_cambio_serv', 'DESC']]
        });
        res.json(historial);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el historial de servicios'
        });
    }
};

export const getHistorialServicio = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const historial = await HistorialServicioOrden.findByPk(id, {
            include: [{
                model: OrdenTrabajo,
                attributes: ['id_ot']
            }]
        });
        
        if (historial) {
            res.json(historial);
        } else {
            res.status(404).json({
                msg: `No existe un registro de historial con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el registro de historial'
        });
    }
};

export const getHistorialServicioPorOT = async (req: Request, res: Response) => {
    const { id_ot } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const historial = await HistorialServicioOrden.findAll({
            where: { id_ot },
            order: [['fecha_cambio_serv', 'DESC']]
        });
        res.json(historial);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el historial de servicios de la orden'
        });
    }
};

export const postHistorialServicio = async (req: Request, res: Response) => {
    const {
        id_ot,
        id_serv,
        new_desc_serv,
        old_desc_serv,
        new_fec_inicio_serv,
        old_fec_inicio_serv,
        new_fec_ter_serv,
        old_fec_ter_serv,
        new_activo_serv,
        old_activo_serv,
        new_completado_serv,
        old_completado_serv
    } = req.body;

    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1, 2])) { // Solo admin y gestor
            return res.status(403).json({
                msg: 'No tiene permisos para crear registros de historial'
            });
        }

        // Verificar si existe la orden de trabajo
        const ordenTrabajo = await OrdenTrabajo.findByPk(id_ot);
        if (!ordenTrabajo) {
            return res.status(404).json({
                msg: `No existe una orden de trabajo con el ID ${id_ot}`
            });
        }

        const historial = await HistorialServicioOrden.create({
            id_ot,
            id_serv,
            fecha_cambio_serv: new Date(),
            new_desc_serv,
            old_desc_serv,
            new_fec_inicio_serv,
            old_fec_inicio_serv,
            new_fec_ter_serv,
            old_fec_ter_serv,
            new_activo_serv,
            old_activo_serv,
            new_completado_serv,
            old_completado_serv
        });

        res.json(historial);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el registro de historial'
        });
    }
};