import { Request, Response } from 'express';
import OrdenTrabajo from '../models/orden_trabajo';
import Cliente from '../models/cliente';
import EstadoOT from '../models/estado_ot';
import Asignacion from '../models/asignacion';
import Trabajador from '../models/trabajador';

// Obtener todas las órdenes de trabajo
export const getOrdenesTrabajo = async (req: Request, res: Response) => {
    try {
        const ordenes = await OrdenTrabajo.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ['nombre_cliente']
                },
                {
                    model: EstadoOT,
                    attributes: ['nom_estado']
                },
                {
                    model: Asignacion,
                    include: [{
                        model: Trabajador,
                        attributes: ['nombre', 'apellido']
                    }]
                }
            ],
            order: [['fecha_creacion_ot', 'DESC']]
        });
        res.json(ordenes);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener las órdenes de trabajo'
        });
    }
};

// Obtener una orden de trabajo por ID
export const getOrdenTrabajo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const orden = await OrdenTrabajo.findByPk(id, {
            include: [
                {
                    model: Cliente,
                    attributes: ['nombre_cliente']
                },
                {
                    model: EstadoOT,
                    attributes: ['nom_estado']
                },
                {
                    model: Asignacion,
                    include: [{
                        model: Trabajador,
                        attributes: ['nombre', 'apellido']
                    }]
                }
            ]
        });

        if (orden) {
            res.json(orden);
        } else {
            res.status(404).json({
                msg: `No existe una orden de trabajo con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener la orden de trabajo'
        });
    }
};

// Crear una nueva orden de trabajo
export const postOrdenTrabajo = async (req: Request, res: Response) => {
    const {
        descripcion_ot,
        fecha_inicio,
        fecha_fin,
        detalles_adicionales,
        id_cliente,
        id_estado
    } = req.body;

    try {
        // Verificar si el cliente existe
        const clienteExiste = await Cliente.findByPk(id_cliente);
        if (!clienteExiste) {
            return res.status(404).json({
                msg: `No existe un cliente con el ID ${id_cliente}`
            });
        }

        // Verificar si el estado existe
        const estadoExiste = await EstadoOT.findByPk(id_estado);
        if (!estadoExiste) {
            return res.status(404).json({
                msg: `No existe un estado con el ID ${id_estado}`
            });
        }

        // Generar número de serie único
        const ultimaOrden = await OrdenTrabajo.findOne({
            order: [['numero_serie', 'DESC']]
        }) as any;
        const numero_serie = ultimaOrden ? ultimaOrden.numero_serie + 1 : 1;

        const orden = await OrdenTrabajo.create({
            descripcion_ot,
            fecha_inicio,
            fecha_fin,
            detalles_adicionales,
            id_cliente,
            numero_serie,
            id_estado,
            fecha_creacion_ot: new Date()
        });

        res.json(orden);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear la orden de trabajo'
        });
    }
};

// Actualizar una orden de trabajo
export const updateOrdenTrabajo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        descripcion_ot,
        fecha_inicio,
        fecha_fin,
        detalles_adicionales,
        id_cliente,
        id_estado
    } = req.body;

    try {
        const orden = await OrdenTrabajo.findByPk(id);
        if (!orden) {
            return res.status(404).json({
                msg: `No existe una orden de trabajo con el id ${id}`
            });
        }

        // Verificar si el nuevo cliente existe (si se está actualizando)
        if (id_cliente) {
            const clienteExiste = await Cliente.findByPk(id_cliente);
            if (!clienteExiste) {
                return res.status(404).json({
                    msg: `No existe un cliente con el ID ${id_cliente}`
                });
            }
        }

        // Verificar si el nuevo estado existe (si se está actualizando)
        if (id_estado) {
            const estadoExiste = await EstadoOT.findByPk(id_estado);
            if (!estadoExiste) {
                return res.status(404).json({
                    msg: `No existe un estado con el ID ${id_estado}`
                });
            }
        }

        await orden.update({
            descripcion_ot,
            fecha_inicio,
            fecha_fin,
            detalles_adicionales,
            id_cliente,
            id_estado
        });

        res.json(orden);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar la orden de trabajo'
        });
    }
};