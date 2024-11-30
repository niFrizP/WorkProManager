import { Request, Response } from 'express';
import ServicioOrden from '../models/servicio_orden';
import Servicio from '../models/servicio';
import OrdenTrabajo from '../models/orden_trabajo';
import { verificarToken, verificarRol } from '../middleware/autenticacion';

// Obtener todos los servicios asignados a órdenes
export const getServiciosOrden = async (req: Request, res: Response) => {
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const serviciosOrden = await ServicioOrden.findAll({
            include: [
                {
                    model: Servicio,
                    attributes: ['id_serv', 'nom_serv']
                },
                {
                    model: OrdenTrabajo,
                    attributes: ['id_ot', 'desc_ot']
                }
            ],
            order: [['fec_inicio_serv', 'DESC']]
        });
        res.json(serviciosOrden);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener los servicios de órdenes'
        });
    }
};

// Obtener servicios por ID de orden de trabajo
export const getServiciosPorOrden = async (req: Request, res: Response) => {
    const { id_ot } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const serviciosOrden = await ServicioOrden.findAll({
            where: { id_ot },
            include: [
                {
                    model: Servicio,
                    attributes: ['id_serv', 'nom_serv']
                }
            ],
            order: [['fec_inicio_serv', 'DESC']]
        });
        res.json(serviciosOrden);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener los servicios de la orden'
        });
    }
};

// Obtener un servicio-orden específico
export const getServicioOrden = async (req: Request, res: Response) => {
    const { id_ot, id_serv } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const servicioOrden = await ServicioOrden.findOne({
            where: { id_ot, id_serv },
            include: [
                {
                    model: Servicio,
                    attributes: ['id_serv', 'nom_serv']
                },
                {
                    model: OrdenTrabajo,
                    attributes: ['id_ot', 'desc_ot']
                }
            ]
        });

        if (servicioOrden) {
            res.json(servicioOrden);
        } else {
            res.status(404).json({
                msg: `No existe un servicio-orden con OT ${id_ot} y servicio ${id_serv}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el servicio-orden'
        });
    }
};

// Crear un nuevo servicio-orden
export const postServicioOrden = async (req: Request, res: Response) => {
    const {
        id_ot,
        id_serv,
        desc_serv,
        fec_inicio_serv,
        fec_ter_serv,
        activo_serv,
        completado_serv
    } = req.body;

    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1, 2])) { // Solo admin y gestor
            return res.status(403).json({
                msg: 'No tiene permisos para crear servicios-orden'
            });
        }

        // Verificar si la orden existe
        const ordenExiste = await OrdenTrabajo.findByPk(id_ot);
        if (!ordenExiste) {
            return res.status(404).json({
                msg: `No existe una orden de trabajo con el ID ${id_ot}`
            });
        }

        // Verificar si el servicio existe
        const servicioExiste = await Servicio.findByPk(id_serv);
        if (!servicioExiste) {
            return res.status(404).json({
                msg: `No existe un servicio con el ID ${id_serv}`
            });
        }

        const servicioOrden = await ServicioOrden.create({
            id_ot,
            id_serv,
            desc_serv,
            fec_inicio_serv: fec_inicio_serv || new Date(),
            fec_ter_serv,
            activo_serv: activo_serv ?? true,
            completado_serv: completado_serv ?? false
        });

        res.json(servicioOrden);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el servicio-orden'
        });
    }
};

// Actualizar un servicio-orden
export const updateServicioOrden = async (req: Request, res: Response) => {
    const { id_ot, id_serv } = req.params;
    const {
        desc_serv,
        fec_inicio_serv,
        fec_ter_serv,
        activo_serv,
        completado_serv
    } = req.body;

    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1, 2])) { // Solo admin y gestor
            return res.status(403).json({
                msg: 'No tiene permisos para actualizar servicios-orden'
            });
        }

        const servicioOrden = await ServicioOrden.findOne({
            where: { id_ot, id_serv }
        });
        
        if (!servicioOrden) {
            return res.status(404).json({
                msg: `No existe un servicio-orden con OT ${id_ot} y servicio ${id_serv}`
            });
        }

        await servicioOrden.update({
            desc_serv,
            fec_inicio_serv,
            fec_ter_serv,
            activo_serv,
            completado_serv
        });

        res.json(servicioOrden);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el servicio-orden'
        });
    }
};

// Eliminar un servicio-orden
export const deleteServicioOrden = async (req: Request, res: Response) => {
    const { id_ot, id_serv } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para eliminar servicios-orden'
            });
        }

        const servicioOrden = await ServicioOrden.findOne({
            where: { id_ot, id_serv }
        });
        
        if (!servicioOrden) {
            return res.status(404).json({
                msg: `No existe un servicio-orden con OT ${id_ot} y servicio ${id_serv}`
            });
        }

        await servicioOrden.destroy();
        res.json({
            msg: 'Servicio-orden eliminado con éxito'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al eliminar el servicio-orden'
        });
    }
}; 