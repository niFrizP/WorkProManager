"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.postOrder = exports.deleteOrder = exports.getOrder = exports.getOrdersByUsuarioOrderEnProceso = exports.getOrdersEliminadas = exports.getOrdersByUsuarioOrder = exports.createSolicitudView = exports.createLastAdjucacionPerUsuario = exports.getSolicitudesFromViewUsuario = exports.getSolicitudesFromView = exports.countOrdersNotificationRechazadas = exports.countOrdersNotificationFinalizada = exports.countOrdersNotificationReportesByRut = exports.countOrdersNotificationCotizacionesByRut = exports.countOrdersNotificationReportes = exports.countOrdersNotificationCotizacon = exports.getOrderssEliminadas = exports.getOrdersCompletadas = exports.getOrdersCotizacionesTecnico = exports.getOrdersCotizacionesGeneral = exports.getOrdersReporteTecnico = exports.getOrdersReporteGeneral = exports.getOrdersEliminadasCountByMonth = exports.getOrdersFinalizadasCountByMonth = exports.getOrdersRealizadasCountByMonth = exports.getOrdersCountByMonth = exports.getOrdersCountTerminadas = exports.getOrdersCountPorRealizadasTecnico = exports.getOrdersCountRealizadasTecnico = exports.getOrdersCountPorRealizarTecnico = exports.getOrdersCountPorRealizar = exports.getOrdersCountByTecnicoByViewsTecnico = exports.getOrdersByTecnico = exports.getOrdersCountbyViewsAdmin = exports.getOrders = void 0;
const orders_1 = __importDefault(require("../models/orders"));
const equipo_1 = __importDefault(require("../models/equipo"));
const cliente_1 = __importDefault(require("../models/cliente"));
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const vistamin_1 = __importDefault(require("../models/vistamin"));
const sequelize_2 = __importDefault(require("sequelize"));
const vistaultimousuario_1 = __importDefault(require("../models/vistaultimousuario"));
const vistatiemposestimados_1 = __importDefault(require("../models/vistatiemposestimados"));
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOrders = yield orders_1.default.findAll({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli', 'd_veri_cli', 'cel_cli', 'email_cli'],
                    required: true
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },
                {
                    model: vistamin_1.default,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'fecha_termino', 'fecha_vista', 'completada', 'id_estado_ot', 'nom_estado_ot', 'completada'],
                    required: true
                },
                {
                    model: vistaultimousuario_1.default,
                    attributes: ['fecha_adjudicacion', 'rut_usuario', 'nom_usu', 'ap_usu'],
                },
                {
                    model: vistatiemposestimados_1.default,
                    attributes: ['tiempo_estimado_total'],
                }
            ],
        });
        console.log('Consulta de órdenes con subconsulta:', JSON.stringify(listOrders, null, 2));
        res.json(listOrders);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            msg: 'Error fetching orders',
        });
    }
});
exports.getOrders = getOrders;
const getOrdersCountbyViewsAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Realizando el conteo de órdenes donde isview = false
        const countOrders = yield orders_1.default.count({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli', 'd_veri_cli', 'cel_cli', 'email_cli'],
                    required: true
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },
                {
                    model: vistamin_1.default,
                    attributes: ['isview'], // Solo seleccionamos el campo 'isview' para aplicar el filtro
                    required: true,
                    where: {
                        isview: false, // Filtramos las órdenes donde isview es false
                        id_estado_ot: {
                            [sequelize_1.Op.in]: [2, 4]
                        }
                    }
                },
                {
                    model: vistaultimousuario_1.default,
                    attributes: ['fecha_adjudicacion', 'rut_usuario', 'nom_usu', 'ap_usu'],
                }
            ],
        });
        // Devolvemos la cantidad de órdenes que cumplen con la condición
        res.json({ count: countOrders });
    }
    catch (error) {
        console.error('Error fetching orders count:', error);
        res.status(500).json({
            msg: 'Error fetching orders count',
        });
    }
});
exports.getOrdersCountbyViewsAdmin = getOrdersCountbyViewsAdmin;
const getOrdersByTecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOrders = yield orders_1.default.findAll({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli', 'd_veri_cli', 'cel_cli', 'email_cli'],
                    required: true
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },
                {
                    model: vistamin_1.default,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'fecha_termino', 'fecha_vista', 'completada', 'id_estado_ot', 'nom_estado_ot', 'completada'],
                    required: true
                },
                {
                    model: vistaultimousuario_1.default,
                    attributes: ['fecha_adjudicacion', 'rut_usuario', 'nom_usu', 'ap_usu'],
                    where: {
                        rut_usuario: req.body.rut_usuario,
                    }
                }
            ],
        });
        console.log('Consulta de órdenes con subconsulta:', JSON.stringify(listOrders, null, 2));
        res.json(listOrders);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            msg: 'Error fetching orders',
        });
    }
});
exports.getOrdersByTecnico = getOrdersByTecnico;
const getOrdersCountByTecnicoByViewsTecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Realizando el conteo de órdenes asignadas a un técnico específico
        const countOrdersByTecnico = yield orders_1.default.count({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli', 'd_veri_cli', 'cel_cli', 'email_cli'],
                    required: true
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },
                {
                    model: vistamin_1.default,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'fecha_termino', 'fecha_vista', 'completada', 'id_estado_ot', 'nom_estado_ot', 'completada'],
                    required: true,
                    where: {
                        isview: false, // Filtramos las órdenes donde isview es false
                        id_estado_ot: {
                            [sequelize_1.Op.in]: [1, 3]
                        },
                    }
                },
                {
                    model: vistaultimousuario_1.default,
                    attributes: ['fecha_adjudicacion', 'rut_usuario', 'nom_usu', 'ap_usu'],
                    where: {
                        rut_usuario: req.body.rut_usuario // Filtramos por el rut_usuario enviado en el cuerpo de la solicitud
                    }
                }
            ],
        });
        // Devolvemos el conteo de las órdenes asignadas al técnico específico
        res.json({ count: countOrdersByTecnico });
    }
    catch (error) {
        console.error('Error fetching orders count by tecnico:', error);
        res.status(500).json({
            msg: 'Error fetching orders count by tecnico',
        });
    }
});
exports.getOrdersCountByTecnicoByViewsTecnico = getOrdersCountByTecnicoByViewsTecnico;
const getOrdersCountPorRealizar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.count({
            include: [
                {
                    model: cliente_1.default,
                    attributes: [], // No necesitas devolver columnas aquí para el conteo
                    required: true,
                },
                {
                    model: equipo_1.default,
                    attributes: [], // Igual para Equipo
                    required: true,
                },
                {
                    model: vistamin_1.default,
                    attributes: [], // Y para VistaSolicitud
                    required: true,
                    where: {
                        id_estado_ot: {
                            [sequelize_1.Op.in]: [1, 2, 3, 4]
                        }
                    }
                },
            ],
        });
        console.log('Número total de órdenes:', ordersCount);
        res.json({ totalOrders: ordersCount });
    }
    catch (error) {
        console.error('Error fetching orders count:', error);
        res.status(500).json({
            msg: 'Error fetching orders count',
        });
    }
});
exports.getOrdersCountPorRealizar = getOrdersCountPorRealizar;
const getOrdersCountPorRealizarTecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.count({
            include: [
                {
                    model: cliente_1.default,
                    attributes: [], // No necesitas devolver columnas aquí para el conteo
                    required: true,
                },
                {
                    model: equipo_1.default,
                    attributes: [], // Igual para Equipo
                    required: true,
                },
                {
                    model: vistamin_1.default,
                    attributes: [], // Y para VistaSolicitud
                    required: true,
                    where: {
                        id_estado_ot: {
                            [sequelize_1.Op.in]: [1, 2, 3]
                        },
                        rut_receptor: req.body.rut_usuario
                    }
                },
            ],
        });
        console.log('Número total de órdenes:', ordersCount);
        res.json({ totalOrders: ordersCount });
    }
    catch (error) {
        console.error('Error fetching orders count:', error);
        res.status(500).json({
            msg: 'Error fetching orders count',
        });
    }
});
exports.getOrdersCountPorRealizarTecnico = getOrdersCountPorRealizarTecnico;
const getOrdersCountRealizadasTecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.count({
            include: [
                {
                    model: cliente_1.default,
                    attributes: [], // No necesitas devolver columnas aquí para el conteo
                    required: true,
                },
                {
                    model: equipo_1.default,
                    attributes: [], // Igual para Equipo
                    required: true,
                },
                {
                    model: vistamin_1.default,
                    attributes: [], // Y para VistaSolicitud
                    required: true,
                    where: {
                        id_estado_ot: {
                            [sequelize_1.Op.in]: [4]
                        },
                        rut_receptor: req.body.rut_usuario
                    }
                },
            ],
        });
        console.log('Número total de órdenes:', ordersCount);
        res.json({ totalOrders: ordersCount });
    }
    catch (error) {
        console.error('Error fetching orders count:', error);
        res.status(500).json({
            msg: 'Error fetching orders count',
        });
    }
});
exports.getOrdersCountRealizadasTecnico = getOrdersCountRealizadasTecnico;
const getOrdersCountPorRealizadasTecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.count({
            include: [
                {
                    model: cliente_1.default,
                    attributes: [], // No necesitas devolver columnas aquí para el conteo
                    required: true,
                },
                {
                    model: equipo_1.default,
                    attributes: [], // Igual para Equipo
                    required: true,
                },
                {
                    model: vistamin_1.default,
                    attributes: [], // Y para VistaSolicitud
                    required: true,
                    where: {
                        id_estado_ot: {
                            [sequelize_1.Op.in]: [1, 2, 3, 4]
                        },
                        rut_receptor: req.body.rut_usuario
                    }
                },
            ],
        });
        console.log('Número total de órdenes:', ordersCount);
        res.json({ totalOrders: ordersCount });
    }
    catch (error) {
        console.error('Error fetching orders count:', error);
        res.status(500).json({
            msg: 'Error fetching orders count',
        });
    }
});
exports.getOrdersCountPorRealizadasTecnico = getOrdersCountPorRealizadasTecnico;
const getOrdersCountTerminadas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.count({
            include: [
                {
                    model: cliente_1.default,
                    attributes: [], // No necesitas devolver columnas aquí para el conteo
                    required: true,
                },
                {
                    model: equipo_1.default,
                    attributes: [], // Igual para Equipo
                    required: true,
                },
                {
                    model: vistamin_1.default,
                    attributes: [], // Y para VistaSolicitud
                    required: true,
                    where: {
                        id_estado_ot: {
                            [sequelize_1.Op.in]: [5, 6]
                        }
                    }
                },
            ],
        });
        console.log('Número total de órdenes:', ordersCount);
        res.json({ totalOrders: ordersCount });
    }
    catch (error) {
        console.error('Error fetching orders count:', error);
        res.status(500).json({
            msg: 'Error fetching orders count',
        });
    }
});
exports.getOrdersCountTerminadas = getOrdersCountTerminadas;
const getOrdersCountByMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.findAll({
            include: [{
                    model: vistamin_1.default,
                    attributes: [], // No se requiere devolver columnas específicas
                    required: true,
                    where: {
                        id_estado_ot: {
                            [sequelize_1.Op.in]: [5]
                        }
                    }
                }],
            attributes: [
                [sequelize_2.default.fn('YEAR', sequelize_2.default.col('orden_trabajo.fec_entrega')), 'year'],
                [sequelize_2.default.fn('MONTH', sequelize_2.default.col('orden_trabajo.fec_entrega')), 'month'],
                [sequelize_2.default.fn('COUNT', sequelize_2.default.col('orden_trabajo.id_ot')), 'totalOrders']
            ],
            where: {
                fec_entrega: {
                    [sequelize_1.Op.between]: [
                        sequelize_2.default.literal("DATE_SUB(CURDATE(), INTERVAL 12 MONTH)"),
                        sequelize_2.default.literal("CURDATE()")
                    ]
                }
            },
            group: [
                sequelize_2.default.fn('YEAR', sequelize_2.default.col('orden_trabajo.fec_entrega')),
                sequelize_2.default.fn('MONTH', sequelize_2.default.col('orden_trabajo.fec_entrega'))
            ],
            order: [
                [sequelize_2.default.fn('YEAR', sequelize_2.default.col('orden_trabajo.fec_entrega')), 'DESC'],
                [sequelize_2.default.fn('MONTH', sequelize_2.default.col('orden_trabajo.fec_entrega')), 'DESC']
            ]
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error('Error fetching orders count by month:', error);
        res.status(500).json({
            msg: 'Error fetching orders count by month',
        });
    }
});
exports.getOrdersCountByMonth = getOrdersCountByMonth;
const getOrdersRealizadasCountByMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.findAll({
            include: [{
                    model: vistamin_1.default,
                    attributes: [], // No se requiere devolver columnas específicas
                    required: true,
                    where: {
                        id_estado_ot: {
                            [sequelize_1.Op.in]: [5]
                        }
                    }
                }],
            attributes: [
                [sequelize_2.default.fn('YEAR', sequelize_2.default.col('orden_trabajo.fec_entrega')), 'year'],
                [sequelize_2.default.fn('MONTH', sequelize_2.default.col('orden_trabajo.fec_entrega')), 'month'],
                [sequelize_2.default.fn('COUNT', sequelize_2.default.col('orden_trabajo.id_ot')), 'totalOrders']
            ],
            where: {
                fec_entrega: {
                    [sequelize_1.Op.between]: [
                        sequelize_2.default.literal("DATE_SUB(CURDATE(), INTERVAL 12 MONTH)"),
                        sequelize_2.default.literal("CURDATE()")
                    ]
                }
            },
            group: [
                sequelize_2.default.fn('YEAR', sequelize_2.default.col('orden_trabajo.fec_entrega')),
                sequelize_2.default.fn('MONTH', sequelize_2.default.col('orden_trabajo.fec_entrega'))
            ],
            order: [
                [sequelize_2.default.fn('YEAR', sequelize_2.default.col('orden_trabajo.fec_entrega')), 'DESC'],
                [sequelize_2.default.fn('MONTH', sequelize_2.default.col('orden_trabajo.fec_entrega')), 'DESC']
            ]
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error('Error fetching orders count by month:', error);
        res.status(500).json({
            msg: 'Error fetching orders count by month',
        });
    }
});
exports.getOrdersRealizadasCountByMonth = getOrdersRealizadasCountByMonth;
const getOrdersFinalizadasCountByMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.findAll({
            include: [{
                    model: vistamin_1.default,
                    attributes: [], // No se requiere devolver columnas específicas
                    required: true,
                    where: {
                        id_estado_ot: {
                            [sequelize_1.Op.in]: [6]
                        }
                    }
                }],
            attributes: [
                [sequelize_2.default.fn('YEAR', sequelize_2.default.col('orden_trabajo.fec_entrega')), 'year'],
                [sequelize_2.default.fn('MONTH', sequelize_2.default.col('orden_trabajo.fec_entrega')), 'month'],
                [sequelize_2.default.fn('COUNT', sequelize_2.default.col('orden_trabajo.id_ot')), 'totalOrders']
            ],
            where: {
                fec_entrega: {
                    [sequelize_1.Op.between]: [
                        sequelize_2.default.literal("DATE_SUB(CURDATE(), INTERVAL 12 MONTH)"),
                        sequelize_2.default.literal("CURDATE()")
                    ]
                }
            },
            group: [
                sequelize_2.default.fn('YEAR', sequelize_2.default.col('orden_trabajo.fec_entrega')),
                sequelize_2.default.fn('MONTH', sequelize_2.default.col('orden_trabajo.fec_entrega'))
            ],
            order: [
                [sequelize_2.default.fn('YEAR', sequelize_2.default.col('orden_trabajo.fec_entrega')), 'DESC'],
                [sequelize_2.default.fn('MONTH', sequelize_2.default.col('orden_trabajo.fec_entrega')), 'DESC']
            ]
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error('Error fetching orders count by month:', error);
        res.status(500).json({
            msg: 'Error fetching orders count by month',
        });
    }
});
exports.getOrdersFinalizadasCountByMonth = getOrdersFinalizadasCountByMonth;
const getOrdersEliminadasCountByMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.findAll({
            include: [{
                    model: vistamin_1.default,
                    attributes: [], // No se requiere devolver columnas específicas
                    required: true,
                    where: {
                        id_estado_ot: {
                            [sequelize_1.Op.in]: [6]
                        }
                    }
                }],
            attributes: [
                [sequelize_2.default.fn('YEAR', sequelize_2.default.col('orden_trabajo.fec_entrega')), 'year'],
                [sequelize_2.default.fn('MONTH', sequelize_2.default.col('orden_trabajo.fec_entrega')), 'month'],
                [sequelize_2.default.fn('COUNT', sequelize_2.default.col('orden_trabajo.id_ot')), 'totalOrders']
            ],
            where: {
                fec_entrega: {
                    [sequelize_1.Op.between]: [
                        sequelize_2.default.literal("DATE_SUB(CURDATE(), INTERVAL 12 MONTH)"),
                        sequelize_2.default.literal("CURDATE()")
                    ]
                }
            },
            group: [
                sequelize_2.default.fn('YEAR', sequelize_2.default.col('orden_trabajo.fec_entrega')),
                sequelize_2.default.fn('MONTH', sequelize_2.default.col('orden_trabajo.fec_entrega'))
            ],
            order: [
                [sequelize_2.default.fn('YEAR', sequelize_2.default.col('orden_trabajo.fec_entrega')), 'DESC'],
                [sequelize_2.default.fn('MONTH', sequelize_2.default.col('orden_trabajo.fec_entrega')), 'DESC']
            ]
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error('Error fetching orders count by month:', error);
        res.status(500).json({
            msg: 'Error fetching orders count by month',
        });
    }
});
exports.getOrdersEliminadasCountByMonth = getOrdersEliminadasCountByMonth;
const getOrdersReporteGeneral = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOrders = yield orders_1.default.findAll({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },
                {
                    model: vistamin_1.default,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot', 'nom_estado_ot'],
                    where: {
                        id_estado_ot: {
                            [sequelize_1.Op.in]: [3, 4]
                        }
                    },
                    required: true
                },
            ],
        });
        console.log('Consulta de órdenes con subconsulta:', JSON.stringify(listOrders, null, 2));
        res.json(listOrders);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            msg: 'Error fetching orders',
        });
    }
});
exports.getOrdersReporteGeneral = getOrdersReporteGeneral;
const getOrdersReporteTecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOrders = yield orders_1.default.findAll({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },
                {
                    model: vistamin_1.default,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot', 'nom_estado_ot'],
                    where: {
                        id_estado_ot: {
                            [sequelize_1.Op.in]: [3]
                        },
                        rut_receptor: req.body.rut_usuario
                    },
                    required: true
                },
            ],
        });
        console.log('Consulta de órdenes con subconsulta:', JSON.stringify(listOrders, null, 2));
        res.json(listOrders);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            msg: 'Error fetching orders',
        });
    }
});
exports.getOrdersReporteTecnico = getOrdersReporteTecnico;
const getOrdersCotizacionesGeneral = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOrders = yield orders_1.default.findAll({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },
                {
                    model: vistamin_1.default,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot', 'nom_estado_ot'],
                    where: {
                        id_estado_ot: {
                            [sequelize_1.Op.in]: [1, 2]
                        }
                    },
                    required: true
                },
            ],
        });
        console.log('Consulta de órdenes con subconsulta:', JSON.stringify(listOrders, null, 2));
        res.json(listOrders);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            msg: 'Error fetching orders',
        });
    }
});
exports.getOrdersCotizacionesGeneral = getOrdersCotizacionesGeneral;
const getOrdersCotizacionesTecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOrders = yield orders_1.default.findAll({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },
                {
                    model: vistamin_1.default,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot', 'nom_estado_ot'],
                    where: {
                        id_estado_ot: {
                            [sequelize_1.Op.in]: [1, 2]
                        },
                        rut_receptor: req.body.rut_usuario
                    },
                    required: true
                },
            ],
        });
        console.log('Consulta de órdenes con subconsulta:', JSON.stringify(listOrders, null, 2));
        res.json(listOrders);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            msg: 'Error fetching orders',
        });
    }
});
exports.getOrdersCotizacionesTecnico = getOrdersCotizacionesTecnico;
const getOrdersCompletadas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOrders = yield orders_1.default.findAll({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },
                {
                    model: vistamin_1.default,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot', 'nom_estado_ot'],
                    where: {
                        id_estado_ot: {
                            [sequelize_1.Op.in]: [5]
                        }
                    },
                    required: true
                },
            ],
        });
        console.log('Consulta de órdenes con subconsulta:', JSON.stringify(listOrders, null, 2));
        res.json(listOrders);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            msg: 'Error fetching orders',
        });
    }
});
exports.getOrdersCompletadas = getOrdersCompletadas;
const getOrderssEliminadas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOrders = yield orders_1.default.findAll({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },
                {
                    model: vistamin_1.default,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot', 'nom_estado_ot'],
                    where: {
                        id_estado_ot: {
                            [sequelize_1.Op.in]: [6]
                        }
                    },
                    required: true
                },
            ],
        });
        console.log('Consulta de órdenes con subconsulta:', JSON.stringify(listOrders, null, 2));
        res.json(listOrders);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            msg: 'Error fetching orders',
        });
    }
});
exports.getOrderssEliminadas = getOrderssEliminadas;
const countOrdersNotificationCotizacon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countOrders = yield orders_1.default.count({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true,
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true,
                },
                {
                    model: vistamin_1.default,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot'],
                    where: {
                        isview: false,
                        id_estado_ot: [1, 2],
                    },
                    required: true,
                },
            ],
        });
        console.log('Número de órdenes con isview true:', countOrders);
        res.json({ count: countOrders });
    }
    catch (error) {
        console.error('Error fetching count of orders:', error);
        res.status(500).json({
            msg: 'Error fetching count of orders',
        });
    }
});
exports.countOrdersNotificationCotizacon = countOrdersNotificationCotizacon;
const countOrdersNotificationReportes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countOrders = yield orders_1.default.count({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true,
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true,
                },
                {
                    model: vistamin_1.default,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot'],
                    where: {
                        isview: false,
                        id_estado_ot: [3, 4],
                    },
                    required: true,
                },
            ],
        });
        console.log('Número de órdenes con isview true:', countOrders);
        res.json({ count: countOrders });
    }
    catch (error) {
        console.error('Error fetching count of orders:', error);
        res.status(500).json({
            msg: 'Error fetching count of orders',
        });
    }
});
exports.countOrdersNotificationReportes = countOrdersNotificationReportes;
const countOrdersNotificationCotizacionesByRut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countOrders = yield orders_1.default.count({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true,
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true,
                },
                {
                    model: vistamin_1.default,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot'],
                    where: {
                        isview: false,
                        id_estado_ot: [1, 2],
                        rut_receptor: req.body.rut_usuario,
                    },
                    required: true,
                },
            ],
        });
        console.log('Número de órdenes con isview true:', countOrders);
        res.json({ count: countOrders });
    }
    catch (error) {
        console.error('Error fetching count of orders:', error);
        res.status(500).json({
            msg: 'Error fetching count of orders',
        });
    }
});
exports.countOrdersNotificationCotizacionesByRut = countOrdersNotificationCotizacionesByRut;
const countOrdersNotificationReportesByRut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countOrders = yield orders_1.default.count({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true,
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true,
                },
                {
                    model: vistamin_1.default,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot'],
                    where: {
                        isview: false,
                        id_estado_ot: [3, 4],
                        rut_receptor: req.body.rut_usuario,
                    },
                    required: true,
                },
            ],
        });
        console.log('Número de órdenes con isview true:', countOrders);
        res.json({ count: countOrders });
    }
    catch (error) {
        console.error('Error fetching count of orders:', error);
        res.status(500).json({
            msg: 'Error fetching count of orders',
        });
    }
});
exports.countOrdersNotificationReportesByRut = countOrdersNotificationReportesByRut;
const countOrdersNotificationFinalizada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countOrders = yield orders_1.default.count({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true,
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true,
                },
                {
                    model: vistamin_1.default,
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
    }
    catch (error) {
        console.error('Error fetching count of orders:', error);
        res.status(500).json({
            msg: 'Error fetching count of orders',
        });
    }
});
exports.countOrdersNotificationFinalizada = countOrdersNotificationFinalizada;
const countOrdersNotificationRechazadas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countOrders = yield orders_1.default.count({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true,
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true,
                },
                {
                    model: vistamin_1.default,
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
    }
    catch (error) {
        console.error('Error fetching count of orders:', error);
        res.status(500).json({
            msg: 'Error fetching count of orders',
        });
    }
});
exports.countOrdersNotificationRechazadas = countOrdersNotificationRechazadas;
const getSolicitudesFromView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Consultar todos los datos desde la vista
        const solicitudesFromView = yield connection_1.default.query('SELECT * FROM vista_solicitudes_min_fecha', {
            type: sequelize_1.QueryTypes.SELECT, // Especificamos que esperamos resultados de tipo SELECT
        });
        // Enviar los resultados al cliente
        res.json(solicitudesFromView);
    }
    catch (error) {
        console.error('Error al obtener solicitudes desde la vista:', error);
        res.status(500).json({ message: 'Error al obtener solicitudes desde la vista', error });
    }
});
exports.getSolicitudesFromView = getSolicitudesFromView;
const getSolicitudesFromViewUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Consultar todos los datos desde la vista
        const solicitudesFromView = yield connection_1.default.query('SELECT * FROM vista_ultima_adjudicacion', {
            type: sequelize_1.QueryTypes.SELECT, // Especificamos que esperamos resultados de tipo SELECT
        });
        // Enviar los resultados al cliente
        res.json(solicitudesFromView);
    }
    catch (error) {
        console.error('Error al obtener solicitudes desde la vista:', error);
        res.status(500).json({ message: 'Error al obtener solicitudes desde la vista', error });
    }
});
exports.getSolicitudesFromViewUsuario = getSolicitudesFromViewUsuario;
const createLastAdjucacionPerUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield connection_1.default.query(createViewQuery);
        res.json({ message: 'Vista creada o actualizada correctamente' });
    }
    catch (error) {
        console.error('Error al crear la vista:', error);
        res.status(500).json({ message: 'Error al crear la vista', error });
    }
});
exports.createLastAdjucacionPerUsuario = createLastAdjucacionPerUsuario;
const createSolicitudView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield connection_1.default.query(createViewQuery);
        res.json({ message: 'Vista creada o actualizada correctamente' });
    }
    catch (error) {
        console.error('Error al crear la vista:', error);
        res.status(500).json({ message: 'Error al crear la vista', error });
    }
});
exports.createSolicitudView = createSolicitudView;
const getOrdersByUsuarioOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOrders = yield orders_1.default.findAll({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },
                {
                    model: vistamin_1.default,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor', 'id_estado_ot', 'nom_estado_ot'],
                    required: true,
                    where: {
                        rut_receptor: req.body.rut_usuario
                    },
                },
            ]
        });
        console.log('Consulta de órdenes con subconsulta:', JSON.stringify(listOrders, null, 2));
        res.json(listOrders);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            msg: 'Error fetching orders',
        });
    }
});
exports.getOrdersByUsuarioOrder = getOrdersByUsuarioOrder;
const getOrdersEliminadas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Determinar el filtro dinámico para `rut_usuario`
        const filters = {};
        if (req.body.rut_usuario) {
            filters.rut_usuario = req.body.rut_usuario;
        }
        const listOrders = yield orders_1.default.findAll({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true,
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true,
                },
                {
                    model: vistamin_1.default,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor'],
                    required: true,
                },
            ],
            where: filters, // Aplica el filtro dinámico
        });
        console.log('Consulta de órdenes con subconsulta:', JSON.stringify(listOrders, null, 2));
        res.json(listOrders);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            msg: 'Error fetching orders',
        });
    }
});
exports.getOrdersEliminadas = getOrdersEliminadas;
const getOrdersByUsuarioOrderEnProceso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOrders = yield orders_1.default.findAll({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },
                {
                    model: vistamin_1.default,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor'],
                    required: true,
                    where: {
                        id_estado_ot: [2, 3, 4], // Filtrar por estado
                        rut_receptor: [222],
                    },
                },
            ]
        });
        console.log('Consulta de órdenes con subconsulta:', JSON.stringify(listOrders, null, 2));
        res.json(listOrders);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            msg: 'Error fetching orders',
        });
    }
});
exports.getOrdersByUsuarioOrderEnProceso = getOrdersByUsuarioOrderEnProceso;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield orders_1.default.findByPk(id, {
            include: [
                { model: equipo_1.default },
                { model: cliente_1.default },
                { model: vistamin_1.default },
                { model: vistaultimousuario_1.default },
            ]
        });
        if (order) {
            res.json(order);
        }
        else {
            res.status(404).json({
                msg: `No existe una orden con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error al obtener la orden, contacta con soporte`
        });
    }
});
exports.getOrder = getOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const order = yield orders_1.default.findByPk(id);
    if (!order) {
        res.status(404).json({
            msg: `No existe una orden con el id ${id}`
        });
    }
    else {
        yield order.destroy();
        res.json({
            msg: 'La orden fue eliminado con exito!'
        });
    }
});
exports.deleteOrder = deleteOrder;
const postOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fec_creacion, fec_entrega, descripcion, rut_cliente, num_equipo } = req.body;
    try {
        const newOrder = yield orders_1.default.create({
            fec_creacion,
            fec_entrega,
            descripcion,
            rut_cliente, // Incluye id_cliente en la creación
            num_equipo, // Incluye num_equipo
        });
        res.json({
            order: newOrder
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
});
exports.postOrder = postOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { fec_creacion, fec_entrega, descripcion, rut_cliente, num_equipo } = req.body; // Obtener los campos del cuerpo de la solicitud
    try {
        const order = yield orders_1.default.findByPk(id); // Buscar la orden por ID
        if (order) {
            // Actualizar los campos del modelo
            yield order.update({
                fec_creacion,
                fec_entrega,
                descripcion,
                rut_cliente,
                num_equipo,
            }); // Actualiza todos los campos proporcionados
            res.json({
                msg: 'La orden fue actualizada con éxito', order
            });
        }
        else {
            res.status(404).json({
                msg: `No existe una orden con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
});
exports.updateOrder = updateOrder;
