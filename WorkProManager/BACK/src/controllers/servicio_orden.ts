import { Request, Response } from 'express';
import ServicioOrden from '../models/servicio_orden';
import Servicio from '../models/servicio';
import OrdenTrabajo from '../models/orden_trabajo';

// Obtener todos los servicios asignados a órdenes
export const getServiciosOrden = async (req: Request, res: Response) => {
    try {
        const serviciosOrden = await ServicioOrden.findAll({
            include: [
                {
                    model: Servicio,
                    attributes: ['nombre_servicio']
                },
                {
                    model: OrdenTrabajo,
                    attributes: ['numero_serie', 'descripcion_ot']
                }
            ],
            order: [['fecha_inicio', 'DESC']]
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
        const serviciosOrden = await ServicioOrden.findAll({
            where: { id_ot },
            include: [
                {
                    model: Servicio,
                    attributes: ['nombre_servicio']
                }
            ],
            order: [['fecha_inicio', 'DESC']]
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
    const { id } = req.params;
    try {
        const servicioOrden = await ServicioOrden.findByPk(id, {
            include: [
                {
                    model: Servicio,
                    attributes: ['nombre_servicio']
                },
                {
                    model: OrdenTrabajo,
                    attributes: ['numero_serie', 'descripcion_ot']
                }
            ]
        });

        if (servicioOrden) {
            res.json(servicioOrden);
        } else {
            res.status(404).json({
                msg: `No existe un servicio-orden con el id ${id}`
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
        id_servicio,
        descripcion_servicio,
        fecha_inicio
    } = req.body;

    try {
        // Verificar si la orden existe
        const ordenExiste = await OrdenTrabajo.findByPk(id_ot);
        if (!ordenExiste) {
            return res.status(404).json({
                msg: `No existe una orden de trabajo con el ID ${id_ot}`
            });
        }

        // Verificar si el servicio existe
        const servicioExiste = await Servicio.findByPk(id_servicio);
        if (!servicioExiste) {
            return res.status(404).json({
                msg: `No existe un servicio con el ID ${id_servicio}`
            });
        }

        const servicioOrden = await ServicioOrden.create({
            id_ot,
            id_servicio,
            descripcion_servicio,
            fecha_inicio: fecha_inicio || new Date()
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
    const { id } = req.params;
    const {
        descripcion_servicio,
        fecha_inicio
    } = req.body;

    try {
        const servicioOrden = await ServicioOrden.findByPk(id);
        if (!servicioOrden) {
            return res.status(404).json({
                msg: `No existe un servicio-orden con el id ${id}`
            });
        }

        await servicioOrden.update({
            descripcion_servicio,
            fecha_inicio
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
    const { id } = req.params;
    try {
        const servicioOrden = await ServicioOrden.findByPk(id);
        if (!servicioOrden) {
            return res.status(404).json({
                msg: `No existe un servicio-orden con el id ${id}`
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