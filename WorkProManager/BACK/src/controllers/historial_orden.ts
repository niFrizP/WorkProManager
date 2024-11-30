import { Request, Response } from 'express';
import HistorialOrden from '../models/historial_orden';
import OrdenTrabajo from '../models/orden_trabajo';
import { verificarToken, verificarRol } from '../middleware/autenticacion';

export const getHistorialOrdenes = async (req: Request, res: Response) => {
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const historial = await HistorialOrden.findAll({
            include: [{
                model: OrdenTrabajo,
                attributes: ['id_ot']
            }],
            order: [['fec_cambio', 'DESC']]
        });
        res.json(historial);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el historial de órdenes'
        });
    }
};

export const getHistorialOrden = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const historial = await HistorialOrden.findByPk(id, {
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

export const getHistorialPorOT = async (req: Request, res: Response) => {
    const { id_ot } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const historial = await HistorialOrden.findAll({
            where: { id_ot },
            order: [['fec_cambio', 'DESC']]
        });
        res.json(historial);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el historial de la orden'
        });
    }
};

export const postHistorialOrden = async (req: Request, res: Response) => {
    const {
        id_ot,
        desc_ot_old,
        desc_ot_new,
        fec_ter_old,
        fec_ter_new,
        det_adic_old,
        det_adic_new,
        num_ser_old,
        num_ser_new,
        id_estado_old,
        id_estado_new,
        motiv_rec_old,
        motiv_rec_new,
        old_rut_cli,
        new_rut_cli,
        id_asig_old,
        id_asig_new
    } = req.body;

    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1, 2])) { // Solo admin y gestor
            return res.status(403).json({
                msg: 'No tiene permisos para crear registros de historial'
            });
        }

        const historial = await HistorialOrden.create({
            id_ot,
            fec_cambio: new Date(),
            desc_ot_old,
            desc_ot_new,
            fec_ter_old,
            fec_ter_new,
            det_adic_old,
            det_adic_new,
            num_ser_old,
            num_ser_new,
            id_estado_old,
            id_estado_new,
            motiv_rec_old,
            motiv_rec_new,
            old_rut_cli,
            new_rut_cli,
            id_asig_old,
            id_asig_new
        });

        res.json(historial);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el registro de historial'
        });
    }
};