import { Request, Response } from 'express';
import Order from '../models/orders';
import Equipo from '../models/equipo';
import Cliente from '../models/cliente';
import Usuario from '../models/usuario';
import Servicio from '../models/servicio';
import { Model, Op, QueryTypes } from 'sequelize';
import sequelize from '../db/connection';

import EstadoOT from '../models/estado_ot';
import Solicitud from '../models/solicitud';
import VistaSolicitud from '../models/vistamin';


export const getOrders = async (req: Request, res: Response) => {
    try {
        const listOrders = await Order.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true
                },
                {
                    model: Usuario,
                    attributes: ['nom_usu', 'ap_usu'],
                    required: true
                },
                {
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },
                {
                    model: EstadoOT,
                    attributes: ['nom_estado_ot'],
                    required: true
                },
                   { model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor'],
                    required: true
                   },
                
            ],
        });

        console.log('Consulta de órdenes con subconsulta:', JSON.stringify(listOrders, null, 2));
        res.json(listOrders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            msg: 'Error fetching orders',
        });
    }
};

export const countOrdersNotification = async (req: Request, res: Response) => {
    try {
        const countOrders = await Order.count({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true,
                },
                {
                    model: Usuario,
                    attributes: ['nom_usu', 'ap_usu'],
                    required: true,
                },
                {
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true,
                },
                {
                    model: EstadoOT,
                    attributes: ['nom_estado_ot'],
                    required: true,
                },
                {
                    model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor'],
                    required: true,
                    where: {
                        isview: true,
                    },
                },
            ],
        });

        console.log('Número de órdenes con isview true:', countOrders);
        res.json({ count: countOrders });
    } catch (error) {
        console.error('Error fetching count of orders:', error);
        res.status(500).json({
            msg: 'Error fetching count of orders',
        });
    }
};

export const getSolicitudesFromView = async (req: Request, res: Response) => {
    try {
        // Consultar todos los datos desde la vista
        const solicitudesFromView = await sequelize.query('SELECT * FROM vista_solicitudes_min_fecha', {
            type: QueryTypes.SELECT,  // Especificamos que esperamos resultados de tipo SELECT
        });

        // Enviar los resultados al cliente
        res.json(solicitudesFromView);
    } catch (error) {
        console.error('Error al obtener solicitudes desde la vista:', error);
        res.status(500).json({ message: 'Error al obtener solicitudes desde la vista', error });
    }
};

export const createSolicitudView = async (req: Request, res: Response) => {
    try {
        // Consulta SQL para crear la vista
        const createViewQuery = `
            CREATE OR REPLACE VIEW vista_solicitudes_min_fecha AS
            SELECT id_sol, id_ot, fecha_emision, isview, fecha_plazo, rut_remitente, rut_receptor
            FROM solicitud s1
            WHERE fecha_emision = (
                SELECT MIN(fecha_emision)
                FROM solicitud s2
                WHERE s2.id_ot = s1.id_ot
            );
        `;

        // Ejecutar la consulta para crear la vista
        await sequelize.query(createViewQuery);

        res.json({ message: 'Vista creada o actualizada correctamente' });
    } catch (error) {
        console.error('Error al crear la vista:', error);
        res.status(500).json({ message: 'Error al crear la vista', error });
    }
};

export const getOrdersByUsuarioOrder = async (req: Request, res: Response) => {
    try {
        const listOrders = await Order.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true
                },
                {
                    model: Usuario,
                    attributes: ['nom_usu', 'ap_usu'],
                    required: true
                },
                {
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },
                {
                    model: EstadoOT,
                    attributes: ['nom_estado_ot'],
                    required: true
                },
                   { model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor'],
                    required: true
                   },
                
            ],where: {
                rut_usuario: req.body.rut_usuario,
                id_estado_ot:{[Op.in]: [1,2]}, // Filtrar donde el estado no sea 5 ni 6
            }
        });

        console.log('Consulta de órdenes con subconsulta:', JSON.stringify(listOrders, null, 2));
        res.json(listOrders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            msg: 'Error fetching orders',
        });
    }
};

export const getOrdersEliminadas = async (req: Request, res: Response) => {
    try {
        // Determinar el filtro dinámico para `rut_usuario`
        const filters: any = {
            id_estado_ot: { [Op.in]: [6] }, // Filtrar estado específico
        };

        if (req.body.rut_usuario) {
            filters.rut_usuario = req.body.rut_usuario;
        }

        const listOrders = await Order.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true,
                },
                {
                    model: Usuario,
                    attributes: ['nom_usu', 'ap_usu'],
                    required: true,
                },
                {
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true,
                },
                {
                    model: EstadoOT,
                    attributes: ['nom_estado_ot'],
                    required: true,
                },
                {
                    model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor'],
                    required: true,
                },
            ],
            where: filters, // Aplica el filtro dinámico
        });

        console.log('Consulta de órdenes con subconsulta:', JSON.stringify(listOrders, null, 2));
        res.json(listOrders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            msg: 'Error fetching orders',
        });
    }
};

export const getOrdersByUsuarioOrderEnProceso = async (req: Request, res: Response) => {
    try {
        const listOrders = await Order.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true
                },
                {
                    model: Usuario,
                    attributes: ['nom_usu', 'ap_usu'],
                    required: true
                },
                {
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },
                {
                    model: EstadoOT,
                    attributes: ['nom_estado_ot'],
                    required: true
                },
                   { model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor'],
                    required: true
                   },
                
            ],where: {
                rut_usuario: req.body.rut_usuario,
                id_estado_ot:{[Op.in]: [3,4]}, // Filtrar donde el estado no sea 5 ni 6
            }
        });

        console.log('Consulta de órdenes con subconsulta:', JSON.stringify(listOrders, null, 2));
        res.json(listOrders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            msg: 'Error fetching orders',
        });
    }
};

export const getOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id, {
            include: [
                { model: Equipo },
                { model: Cliente },
                { model: Usuario },
                { model: EstadoOT }
            ]
        });

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({
                msg: `No existe una orden con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error al obtener la orden, contacta con soporte`
        });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
        res.status(404).json({
            msg: `No existe una orden con el id ${id}`
        })
    } else {
        await order.destroy();
        res.json({
            msg: 'La orden fue eliminado con exito!'
        })
    }

}

export const postOrder = async (req: Request, res: Response) => {
    const { fec_creacion, fec_entrega, descripcion, rut_cliente, rut_usuario, num_equipo,id_estado_ot } = req.body;

    try {
        const newOrder = await Order.create({
            fec_creacion,
            fec_entrega,
            descripcion,
            rut_cliente, // Incluye id_cliente en la creación
            rut_usuario, // Incluye rut_usuario
            num_equipo,  // Incluye num_equipo
            id_estado_ot
        });

        res.json({
            order: newOrder
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};


export const updateOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { fec_creacion, fec_entrega, descripcion, rut_cliente, rut_usuario, num_equipo, id_estado_ot } = req.body; // Obtener los campos del cuerpo de la solicitud

    try {
        const order = await Order.findByPk(id); // Buscar la orden por ID

        if (order) {
            // Actualizar los campos del modelo
            await order.update({
                fec_creacion,
                fec_entrega,
                descripcion,
                rut_cliente,
                rut_usuario,
                num_equipo,
                id_estado_ot
            }); // Actualiza todos los campos proporcionados
            res.json({
                msg: 'La orden fue actualizada con éxito', order
            });
        } else {
            res.status(404).json({
                msg: `No existe una orden con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};



