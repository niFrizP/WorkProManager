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
import Sequelize from 'sequelize';
import VistaSolicitudTecnico from '../models/vistatecnico';
import VistaUltimaAdjudicacion from '../models/vistaultimousuario';


export const getOrders = async (req: Request, res: Response) => {
    try {
        const listOrders = await Order.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli', 'ap_cli', 'd_veri_cli', 'cel_cli', 'email_cli'],
                    required: true
                },

                {
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },

                   { model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo','fecha_termino','fecha_vista' ,'completada', 'id_estado_ot', 'nom_estado_ot', 'completada'],
                    required: true
                   },
                   {model: VistaUltimaAdjudicacion,
                    attributes: ['fecha_adjudicacion', 'rut_usuario', 'nom_usu', 'ap_usu'],
                   }
                
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

export const getOrdersByTecnico = async (req: Request, res: Response) => {
    try {
        const listOrders = await Order.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli', 'ap_cli', 'd_veri_cli', 'cel_cli', 'email_cli'],
                    required: true
                },

                {
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },

                   { model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo','fecha_termino','fecha_vista' ,'completada', 'id_estado_ot', 'nom_estado_ot', 'completada'],
                    required: true
                   },
                   {model: VistaUltimaAdjudicacion,
                    attributes: ['fecha_adjudicacion', 'rut_usuario', 'nom_usu', 'ap_usu'],
                    where: {
                        rut_usuario: req.body.rut_usuario
                    }
                   }
                
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

export const getOrdersCountPorRealizar = async (req: Request, res: Response) => {
    try {
        const ordersCount = await Order.count({
            include: [
                {
                    model: Cliente,
                    attributes: [], // No necesitas devolver columnas aquí para el conteo
                    required: true,
                },
                {
                    model: Equipo,
                    attributes: [], // Igual para Equipo
                    required: true,
                },
                {
                    model: VistaSolicitud,
                    attributes: [], // Y para VistaSolicitud
                    required: true,
                    where:{
                        id_estado_ot: {
                            [Op.in]: [1,2,3,4]

                        }

                    }
                },
            ],
        });

        console.log('Número total de órdenes:', ordersCount);
        res.json({ totalOrders: ordersCount });
    } catch (error) {
        console.error('Error fetching orders count:', error);
        res.status(500).json({
            msg: 'Error fetching orders count',
        });
    }
};

export const getOrdersCountPorRealizarTecnico = async (req: Request, res: Response) => {
    try {
        const ordersCount = await Order.count({
            include: [
                {
                    model: Cliente,
                    attributes: [], // No necesitas devolver columnas aquí para el conteo
                    required: true,
                },

                {
                    model: Equipo,
                    attributes: [], // Igual para Equipo
                    required: true,
                },
                {
                    model: VistaSolicitud,
                    attributes: [], // Y para VistaSolicitud
                    required: true,
                    where:{
                        id_estado_ot: {
                            [Op.in]: [1,2,3]

                        },
                        rut_receptor: req.body.rut_usuario

                    }
                },
            ],
        });

        console.log('Número total de órdenes:', ordersCount);
        res.json({ totalOrders: ordersCount });
    } catch (error) {
        console.error('Error fetching orders count:', error);
        res.status(500).json({
            msg: 'Error fetching orders count',
        });
    }
};

export const getOrdersCountRealizadasTecnico = async (req: Request, res: Response) => {
    try {
        const ordersCount = await Order.count({
            include: [
                {
                    model: Cliente,
                    attributes: [], // No necesitas devolver columnas aquí para el conteo
                    required: true,
                },
                {
                    model: Equipo,
                    attributes: [], // Igual para Equipo
                    required: true,
                },
                {
                    model: VistaSolicitud,
                    attributes: [], // Y para VistaSolicitud
                    required: true,
                    where:{
                        id_estado_ot: {
                            [Op.in]: [4]

                        },
                        rut_receptor: req.body.rut_usuario

                    }
                },
            ],
        });

        console.log('Número total de órdenes:', ordersCount);
        res.json({ totalOrders: ordersCount });
    } catch (error) {
        console.error('Error fetching orders count:', error);
        res.status(500).json({
            msg: 'Error fetching orders count',
        });
    }
};

export const getOrdersCountPorRealizadasTecnico = async (req: Request, res: Response) => {
    try {
        const ordersCount = await Order.count({
            include: [
                {
                    model: Cliente,
                    attributes: [], // No necesitas devolver columnas aquí para el conteo
                    required: true,
                },

                {
                    model: Equipo,
                    attributes: [], // Igual para Equipo
                    required: true,
                },
                {
                    model: VistaSolicitud,
                    attributes: [], // Y para VistaSolicitud
                    required: true,
                    where:{
                        id_estado_ot: {
                            [Op.in]: [1,2,3,4]

                        },
                        rut_receptor: req.body.rut_usuario

                    }
                },
            ],
        });

        console.log('Número total de órdenes:', ordersCount);
        res.json({ totalOrders: ordersCount });
    } catch (error) {
        console.error('Error fetching orders count:', error);
        res.status(500).json({
            msg: 'Error fetching orders count',
        });
    }
};

export const getOrdersCountTerminadas = async (req: Request, res: Response) => {
    try {
        const ordersCount = await Order.count({
            include: [
                {
                    model: Cliente,
                    attributes: [], // No necesitas devolver columnas aquí para el conteo
                    required: true,
                },

                {
                    model: Equipo,
                    attributes: [], // Igual para Equipo
                    required: true,
                },
                {
                    model: VistaSolicitud,
                    attributes: [], // Y para VistaSolicitud
                    required: true,
                    where:{
                        id_estado_ot: {
                            [Op.in]: [5,6]

                        }

                    }
                },
            ],
        });

        console.log('Número total de órdenes:', ordersCount);
        res.json({ totalOrders: ordersCount });
    } catch (error) {
        console.error('Error fetching orders count:', error);
        res.status(500).json({
            msg: 'Error fetching orders count',
        });
    }
};


export const getOrdersCountByMonth = async (req: Request, res: Response) => {
    try {
        const ordersCount = await Order.findAll({
            include: [{
                model: VistaSolicitud,
                attributes: [], // No se requiere devolver columnas específicas
                required: true,
                where: {
                    id_estado_ot: {
                        [Op.in]: [5]
                    }
                }
            }],
            attributes: [
                [Sequelize.fn('YEAR', Sequelize.col('orden_trabajo.fec_entrega')), 'year'],
                [Sequelize.fn('MONTH', Sequelize.col('orden_trabajo.fec_entrega')), 'month'],
                [Sequelize.fn('COUNT', Sequelize.col('orden_trabajo.id_ot')), 'totalOrders']
            ],
            where: {
                fec_entrega: {
                    [Op.between]: [
                        Sequelize.literal("DATE_SUB(CURDATE(), INTERVAL 12 MONTH)"),
                        Sequelize.literal("CURDATE()")
                    ]
                }
            },
            group: [
                Sequelize.fn('YEAR', Sequelize.col('orden_trabajo.fec_entrega')),
                Sequelize.fn('MONTH', Sequelize.col('orden_trabajo.fec_entrega'))
            ],
            order: [
                [Sequelize.fn('YEAR', Sequelize.col('orden_trabajo.fec_entrega')), 'DESC'],
                [Sequelize.fn('MONTH', Sequelize.col('orden_trabajo.fec_entrega')), 'DESC']
            ]
        });

        res.json(ordersCount);
    } catch (error) {
        console.error('Error fetching orders count by month:', error);
        res.status(500).json({
            msg: 'Error fetching orders count by month',
        });
    }
};

export const getOrdersRealizadasCountByMonth = async (req: Request, res: Response) => {
    try {
        const ordersCount = await Order.findAll({
            include: [{
                model: VistaSolicitud,
                attributes: [], // No se requiere devolver columnas específicas
                required: true,
                where: {
                    id_estado_ot: {
                        [Op.in]: [5]
                    }
                }
            }],
            attributes: [
                [Sequelize.fn('YEAR', Sequelize.col('orden_trabajo.fec_entrega')), 'year'],
                [Sequelize.fn('MONTH', Sequelize.col('orden_trabajo.fec_entrega')), 'month'],
                [Sequelize.fn('COUNT', Sequelize.col('orden_trabajo.id_ot')), 'totalOrders']
            ],
            where: {
                fec_entrega: {
                    [Op.between]: [
                        Sequelize.literal("DATE_SUB(CURDATE(), INTERVAL 12 MONTH)"),
                        Sequelize.literal("CURDATE()")
                    ]
                }
            },
            group: [
                Sequelize.fn('YEAR', Sequelize.col('orden_trabajo.fec_entrega')),
                Sequelize.fn('MONTH', Sequelize.col('orden_trabajo.fec_entrega'))
            ],
            order: [
                [Sequelize.fn('YEAR', Sequelize.col('orden_trabajo.fec_entrega')), 'DESC'],
                [Sequelize.fn('MONTH', Sequelize.col('orden_trabajo.fec_entrega')), 'DESC']
            ]
        });

        res.json(ordersCount);
    } catch (error) {
        console.error('Error fetching orders count by month:', error);
        res.status(500).json({
            msg: 'Error fetching orders count by month',
        });
    }
};

export const getOrdersFinalizadasCountByMonth = async (req: Request, res: Response) => {
    try {
        const ordersCount = await Order.findAll({
            include: [{
                model: VistaSolicitud,
                attributes: [], // No se requiere devolver columnas específicas
                required: true,
                where: {
                    id_estado_ot: {
                        [Op.in]: [6]
                    }
                }
            }],
            attributes: [
                [Sequelize.fn('YEAR', Sequelize.col('orden_trabajo.fec_entrega')), 'year'],
                [Sequelize.fn('MONTH', Sequelize.col('orden_trabajo.fec_entrega')), 'month'],
                [Sequelize.fn('COUNT', Sequelize.col('orden_trabajo.id_ot')), 'totalOrders']
            ],
            where: {
                fec_entrega: {
                    [Op.between]: [
                        Sequelize.literal("DATE_SUB(CURDATE(), INTERVAL 12 MONTH)"),
                        Sequelize.literal("CURDATE()")
                    ]
                }
            },
            group: [
                Sequelize.fn('YEAR', Sequelize.col('orden_trabajo.fec_entrega')),
                Sequelize.fn('MONTH', Sequelize.col('orden_trabajo.fec_entrega'))
            ],
            order: [
                [Sequelize.fn('YEAR', Sequelize.col('orden_trabajo.fec_entrega')), 'DESC'],
                [Sequelize.fn('MONTH', Sequelize.col('orden_trabajo.fec_entrega')), 'DESC']
            ]
        });

        res.json(ordersCount);
    } catch (error) {
        console.error('Error fetching orders count by month:', error);
        res.status(500).json({
            msg: 'Error fetching orders count by month',
        });
    }
};

export const getOrdersEliminadasCountByMonth = async (req: Request, res: Response) => {
    try {
        const ordersCount = await Order.findAll({
            include: [{
                model: VistaSolicitud,
                attributes: [], // No se requiere devolver columnas específicas
                required: true,
                where: {
                    id_estado_ot: {
                        [Op.in]: [6]
                    }
                }
            }],
            attributes: [
                [Sequelize.fn('YEAR', Sequelize.col('orden_trabajo.fec_entrega')), 'year'],
                [Sequelize.fn('MONTH', Sequelize.col('orden_trabajo.fec_entrega')), 'month'],
                [Sequelize.fn('COUNT', Sequelize.col('orden_trabajo.id_ot')), 'totalOrders']
            ],
            where: {
                fec_entrega: {
                    [Op.between]: [
                        Sequelize.literal("DATE_SUB(CURDATE(), INTERVAL 12 MONTH)"),
                        Sequelize.literal("CURDATE()")
                    ]
                }
            },
            group: [
                Sequelize.fn('YEAR', Sequelize.col('orden_trabajo.fec_entrega')),
                Sequelize.fn('MONTH', Sequelize.col('orden_trabajo.fec_entrega'))
            ],
            order: [
                [Sequelize.fn('YEAR', Sequelize.col('orden_trabajo.fec_entrega')), 'DESC'],
                [Sequelize.fn('MONTH', Sequelize.col('orden_trabajo.fec_entrega')), 'DESC']
            ]
        });

        res.json(ordersCount);
    } catch (error) {
        console.error('Error fetching orders count by month:', error);
        res.status(500).json({
            msg: 'Error fetching orders count by month',
        });
    }
};



export const getOrdersReporteGeneral = async (req: Request, res: Response) => {
    try {
        const listOrders = await Order.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true
                },

                {
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },

                   { model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot', 'nom_estado_ot'],
                    where: {
                        id_estado_ot: {
                            [Op.in]: [3,4]
                        }
                    },
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

export const getOrdersReporteTecnico = async (req: Request, res: Response) => {
    try {
        const listOrders = await Order.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true
                },

                {
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },

                   { model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot', 'nom_estado_ot'],
                    where: {
                        id_estado_ot: {
                            [Op.in]: [3]
                        },
                        rut_receptor: req.body.rut_usuario
                    },
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

export const getOrdersCotizacionesGeneral = async (req: Request, res: Response) => {
    try {
        const listOrders = await Order.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true
                },

                {
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },

                   { model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot', 'nom_estado_ot'],
                    where: {
                        id_estado_ot: {
                            [Op.in]: [1,2]
                        }
                    },
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

export const getOrdersCotizacionesTecnico = async (req: Request, res: Response) => {
    try {
        const listOrders = await Order.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true
                },

                {
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },

                   { model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot', 'nom_estado_ot'],
                    where: {
                        id_estado_ot: {
                            [Op.in]: [1,2]
                        },
                        rut_receptor: req.body.rut_usuario
                    },
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




export const getOrdersCompletadas = async (req: Request, res: Response) => {
    try {
        const listOrders = await Order.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true
                },

                {
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },

                   { model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot', 'nom_estado_ot'],
                    where: {
                        id_estado_ot: {
                            [Op.in]: [5]
                        }
                    },
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


export const getOrderssEliminadas = async (req: Request, res: Response) => {
    try {
        const listOrders = await Order.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true
                },
                {
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },

                   { model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot', 'nom_estado_ot'],
                    where: {
                        id_estado_ot: {
                            [Op.in]: [6]
                        }
                    },
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









export const countOrdersNotificationCotizacon = async (req: Request, res: Response) => {
    try {
        const countOrders = await Order.count({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true,
                },

                {
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true,
                },

                {
                    model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot'],
                    where: {
                        isview: false,
                        id_estado_ot: [1,2],
                    },
                    required: true,

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

export const countOrdersNotificationReportes = async (req: Request, res: Response) => {
    try {
        const countOrders = await Order.count({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true,
                },

                {
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true,
                },

                {
                    model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot'],
                    where: {
                        isview: false,
                        id_estado_ot: [3,4],
                    },
                    required: true,

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

export const countOrdersNotificationCotizacionesByRut = async (req: Request, res: Response) => {
    try {
        const countOrders = await Order.count({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true,
                },

                {
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true,
                },

                {
                    model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot'],
                    where: {
                        isview: false,
                        id_estado_ot: [1,2],
                        rut_receptor: req.body.rut_usuario,
                    },
                    required: true,

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

export const countOrdersNotificationReportesByRut = async (req: Request, res: Response) => {
    try {
        const countOrders = await Order.count({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true,
                },

                {
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true,
                },

                {
                    model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot'],
                    where: {
                        isview: false,
                        id_estado_ot: [3,4],
                        rut_receptor: req.body.rut_usuario,
                    },
                    required: true,

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

export const countOrdersNotificationFinalizada = async (req: Request, res: Response) => {
    try {
        const countOrders = await Order.count({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true,
                },

                {
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true,
                },

                {
                    model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot'],
                    where: {
                        isview: false,
                        id_estado_ot: [5],
                    },
                    required: true,

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

export const countOrdersNotificationRechazadas = async (req: Request, res: Response) => {
    try {
        const countOrders = await Order.count({
            include: [
                {
                    model: Cliente,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true,
                },

                {
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true,
                },

                {
                    model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot'],
                    where: {
                        isview: false,
                        id_estado_ot: [6],
                    },
                    required: true,

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


export const getSolicitudesFromViewUsuario = async (req: Request, res: Response) => {
    try {
        // Consultar todos los datos desde la vista
        const solicitudesFromView = await sequelize.query('SELECT * FROM vista_ultima_adjudicacion', {
            type: QueryTypes.SELECT,  // Especificamos que esperamos resultados de tipo SELECT
        });

        // Enviar los resultados al cliente
        res.json(solicitudesFromView);
    } catch (error) {
        console.error('Error al obtener solicitudes desde la vista:', error);
        res.status(500).json({ message: 'Error al obtener solicitudes desde la vista', error });
    }
};

export const createLastAdjucacionPerUsuario = async (req: Request, res: Response) => {
    try {
        // Consulta SQL para crear la vista
        const createViewQuery = `
           CREATE OR REPLACE VIEW vista_ultima_adjudicacion AS
SELECT 
    s1.id_adjudicacion,
    s1.rut_usuario,
    s1.id_ot,
    s1.fecha_adjudicacion,
    (SELECT nom_usu FROM usuario WHERE rut_usuario = s1.rut_usuario) AS nom_usu,
    (SELECT ap_usu FROM usuario WHERE rut_usuario = s1.rut_usuario) AS ap_usu
FROM adjudicacion s1
WHERE s1.rut_usuario IS NOT NULL
  AND NOT EXISTS (
      SELECT 1 
      FROM adjudicacion s2
      WHERE s2.id_ot = s1.id_ot
        AND s2.rut_usuario IS NOT NULL
        AND (
            s2.fecha_adjudicacion > s1.fecha_adjudicacion OR 
            (s2.fecha_adjudicacion = s1.fecha_adjudicacion AND s2.id_adjudicacion > s1.id_adjudicacion)
        )
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



export const createSolicitudView = async (req: Request, res: Response) => {
    try {
        // Consulta SQL para crear la vista
        const createViewQuery = `
            CREATE OR REPLACE VIEW vista_solicitudes_min_fecha AS
            SELECT id_sol, id_ot, fecha_emision, isview, fecha_plazo,fecha_termino, id_estado_ot,completada,fecha_vista,
            (SELECT nom_estado_ot FROM estado_ot WHERE id_estado_ot = s1.id_estado_ot) AS nom_estado_ot
            FROM solicitud s1
            WHERE fecha_emision = (
                SELECT MAX(fecha_emision)
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
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },

                   { model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot', 'nom_estado_ot'],
                    required: true,
                    where:
                    {
                        rut_receptor: req.body.rut_usuario
                    },
                   },
            
            ]
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
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
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
                    model: Equipo,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },

                   { model: VistaSolicitud,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor'],
                    required: true,
                    where: {
                        id_estado_ot: [2,3,4], // Filtrar por estado
                        rut_receptor: [222],
                    },
                   },
                
            ]
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
                { model: VistaSolicitud},
                { model: VistaUltimaAdjudicacion}
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
    const { fec_creacion, fec_entrega, descripcion, rut_cliente, num_equipo } = req.body;

    try {
        const newOrder = await Order.create({
            fec_creacion,
            fec_entrega,
            descripcion,
            rut_cliente, // Incluye id_cliente en la creación
            num_equipo,  // Incluye num_equipo
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
    const { fec_creacion, fec_entrega, descripcion, rut_cliente, num_equipo } = req.body; // Obtener los campos del cuerpo de la solicitud

    try {
        const order = await Order.findByPk(id); // Buscar la orden por ID

        if (order) {
            // Actualizar los campos del modelo
            await order.update({
                fec_creacion,
                fec_entrega,
                descripcion,
                rut_cliente,
                num_equipo,
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



