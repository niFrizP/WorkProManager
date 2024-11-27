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
exports.updateOrder = exports.postOrder = exports.deleteOrder = exports.getOrder = exports.getOrdersBy = exports.getOrdersByMonthAndYear = exports.getOrdersFromLast7DaysExcludingWeekends = exports.getOrdersByYear = exports.getOrdersByFecha = exports.getOrdersEstadoSum = exports.getOrdersCosto = exports.getOrdersByUsuario = exports.countOrdersByDate = exports.getOrdersByEstadoEliminadaByUser = exports.getOrdersByEstadoByUser = exports.getOrdersByEstadoTotalByUser = exports.getOrdersByEstadoEliminada = exports.getOrdersByEstadoTotal = exports.getOrdersByEstado = exports.getOrdersByEstadoTotalEnTiempo = exports.getOrdersByEstadoEnTiempoGrafico = exports.getOrdersByEstadoEnTiempo = exports.getDetallesOtByOTSum = exports.getOrdersByEstadoByUser_5 = exports.getOrdersByEstadoByUser_4 = exports.getOrdersByEstadoByUser_3 = exports.getOrdersByEstadoByUser_2 = exports.getOrdersByEstadoByUser_1 = void 0;
const orders_1 = __importDefault(require("../models/orders"));
const equipo_1 = __importDefault(require("../models/equipo"));
const cliente_1 = __importDefault(require("../models/cliente"));
const usuario_1 = __importDefault(require("../models/usuario"));
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const detalle_ot_1 = __importDefault(require("../models/detalle_ot"));
const servicio_1 = __importDefault(require("../models/servicio"));
const getOrdersByEstadoByUser_1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: [[connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número total de órdenes
            where: Object.assign({}, ({
                fec_entrega: {
                    [sequelize_1.Op.gt]: connection_1.default.fn('NOW'),
                },
                rut_usuario: {
                    [sequelize_1.Op.eq]: req.body.rut_usuario
                }
            })),
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersByEstadoByUser_1 = getOrdersByEstadoByUser_1;
const getOrdersByEstadoByUser_2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: [[connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número total de órdenes
            where: Object.assign({}, ({
                fec_entrega: {
                    [sequelize_1.Op.gt]: connection_1.default.fn('NOW'),
                },
                rut_usuario: {
                    [sequelize_1.Op.eq]: req.body.rut_usuario
                }
            })),
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersByEstadoByUser_2 = getOrdersByEstadoByUser_2;
const getOrdersByEstadoByUser_3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: [[connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número total de órdenes
            where: Object.assign({}, ({
                fec_entrega: {
                    [sequelize_1.Op.gt]: connection_1.default.fn('NOW'),
                },
                rut_usuario: {
                    [sequelize_1.Op.eq]: req.body.rut_usuario
                }
            })),
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersByEstadoByUser_3 = getOrdersByEstadoByUser_3;
const getOrdersByEstadoByUser_4 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: [[connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número total de órdenes
            where: Object.assign({}, ({
                fec_entrega: {
                    [sequelize_1.Op.gt]: connection_1.default.fn('NOW'),
                },
                rut_usuario: {
                    [sequelize_1.Op.eq]: req.body.rut_usuario
                }
            })),
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersByEstadoByUser_4 = getOrdersByEstadoByUser_4;
const getOrdersByEstadoByUser_5 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: [[connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número total de órdenes
            where: Object.assign({}, ({
                fec_entrega: {
                    [sequelize_1.Op.gt]: connection_1.default.fn('NOW'),
                },
                rut_usuario: {
                    [sequelize_1.Op.eq]: req.body.rut_usuario
                }
            })),
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersByEstadoByUser_5 = getOrdersByEstadoByUser_5;
const getDetallesOtByOTSum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_ot } = req.params;
    try {
        // Realizar la consulta para obtener los detalles de la orden de trabajo junto con la suma de los tiempos estimados
        const detallesOt = yield detalle_ot_1.default.findOne({
            attributes: [
                'id_ot',
                [connection_1.default.fn('SUM', connection_1.default.col('Servicios.tiempo_estimado')), 'total_tiempo_estimado']
            ],
            include: [{
                    model: servicio_1.default,
                    attributes: [] // No es necesario incluir los detalles de 'tiempo_estimado' aquí
                }],
            where: { id_ot },
            group: ['Detalle_Ot.id_ot'] // Agrupar por id_ot para obtener la suma por cada id_ot
        });
        // Si no se encuentra detalles para ese id_ot, se retorna un mensaje adecuado
        if (!detallesOt) {
            return res.status(404).json({ message: 'No se encontraron detalles para esta orden de trabajo' });
        }
        res.json(detallesOt);
    }
    catch (error) {
        console.error('Error en getDetallesOt:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getDetallesOtByOTSum = getDetallesOtByOTSum;
const getOrdersByEstadoEnTiempo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate } = req.body;
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: [[connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número total de órdenes
            where: Object.assign({}, (startDate && endDate && {
                fec_entrega: {
                    [sequelize_1.Op.gt]: connection_1.default.fn('NOW'),
                    [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)],
                },
            })),
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersByEstadoEnTiempo = getOrdersByEstadoEnTiempo;
const getOrdersByEstadoEnTiempoGrafico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Definir la expresión de fecha para agrupar por mes/año
        const monthYearFormat = connection_1.default.fn('DATE_FORMAT', connection_1.default.col('fec_entrega'), '%Y-%m');
        const ordersCount = yield orders_1.default.findAll({
            attributes: [
                [monthYearFormat, 'monthYear'], // Agrupar por año y mes
                [connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total'], // Contar las órdenes por mes
            ],
            where: {
                fec_entrega: {
                    [sequelize_1.Op.between]: [
                        connection_1.default.fn('DATE_SUB', connection_1.default.fn('NOW'), connection_1.default.literal('INTERVAL 12 MONTH')), // Fecha de hace 12 meses
                        connection_1.default.fn('NOW'), // Fecha actual
                    ],
                },
            },
            group: [monthYearFormat], // Agrupar por mes y año
            order: [[monthYearFormat, 'ASC']], // Ordenar por mes/año
        });
        // Enviar los datos como respuesta
        res.json(ordersCount);
    }
    catch (error) {
        // Mejor manejo de errores con el mensaje completo
        console.error('Error al obtener los datos:', error);
        res.status(500).send('Error al obtener los datos: ' + error);
    }
});
exports.getOrdersByEstadoEnTiempoGrafico = getOrdersByEstadoEnTiempoGrafico;
const getOrdersByEstadoTotalEnTiempo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate } = req.body;
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: [[connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número total de órdenes
            where: Object.assign({}, (startDate && endDate && {
                fec_entrega: {
                    [sequelize_1.Op.gt]: connection_1.default.fn('NOW'),
                    [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)],
                },
            })),
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersByEstadoTotalEnTiempo = getOrdersByEstadoTotalEnTiempo;
const getOrdersByEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate } = req.body;
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: [[connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número total de órdenes
            where: Object.assign({}, (startDate && endDate && {
                fec_entrega: {
                    [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)],
                },
            })),
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersByEstado = getOrdersByEstado;
const getOrdersByEstadoTotal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate } = req.body;
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: [[connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número total de órdenes
            where: Object.assign({}, (startDate && endDate && {
                fec_entrega: {
                    [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)],
                },
            })),
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersByEstadoTotal = getOrdersByEstadoTotal;
const getOrdersByEstadoEliminada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate } = req.body;
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: [[connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número total de órdenes
            where: Object.assign({}, (startDate && endDate && {
                fec_entrega: {
                    [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)],
                },
            })),
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersByEstadoEliminada = getOrdersByEstadoEliminada;
const getOrdersByEstadoTotalByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate } = req.body;
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: [[connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número total de órdenes
            where: Object.assign({}, (startDate && endDate && {
                fec_entrega: {
                    [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)],
                },
                rut_usuario: {
                    [sequelize_1.Op.eq]: req.body.rut_usuario
                }
            })),
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersByEstadoTotalByUser = getOrdersByEstadoTotalByUser;
const getOrdersByEstadoByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate } = req.body;
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: [[connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número total de órdenes
            where: Object.assign({}, (startDate && endDate && {
                fec_entrega: {
                    [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)],
                },
                rut_usuario: {
                    [sequelize_1.Op.eq]: req.body.rut_usuario
                }
            })),
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersByEstadoByUser = getOrdersByEstadoByUser;
const getOrdersByEstadoEliminadaByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate } = req.body;
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: [[connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número total de órdenes
            where: Object.assign({}, (startDate && endDate && {
                fec_entrega: {
                    [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)],
                },
                rut_usuario: {
                    [sequelize_1.Op.eq]: req.body.rut_usuario
                }
            })),
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersByEstadoEliminadaByUser = getOrdersByEstadoEliminadaByUser;
const countOrdersByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield orders_1.default.findAll({
            attributes: ['fecha', [connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número de órdenes por estado
            group: ['fecha'], // Agrupar por el campo 'estado'
        });
        res.json(count);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.countOrdersByDate = countOrdersByDate;
const getOrdersByUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: ['rut_usuario', [connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número de órdenes por estado
            group: ['rut_usuario'], // Agrupar por el campo 'estado'
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersByUsuario = getOrdersByUsuario;
const getOrdersCosto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: ['', [connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número de órdenes por estado
            group: ['rut_usuario'], // Agrupar por el campo 'estado'
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersCosto = getOrdersCosto;
const getOrdersEstadoSum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: [
                [connection_1.default.fn('COUNT', connection_1.default.col('costo')), 'total_estado'] // Sumar el valor de id_estado_ot por usuario
            ],
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersEstadoSum = getOrdersEstadoSum;
const getOrdersByFecha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: ['fecha', [connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número de órdenes por estado
            group: ['fecha'], // Agrupar por el campo 'estado'
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersByFecha = getOrdersByFecha;
const getOrdersByYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: [
                [connection_1.default.fn('YEAR', connection_1.default.col('fecha')), 'año'], // Extraer el año de la fecha
                [connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total'] // Contar el número total de OT por mes y año
            ],
            group: ['año',], // Agrupar por año y mes
            order: [['año', 'ASC']] // Ordenar por año y mes en orden ascendente
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersByYear = getOrdersByYear;
const getOrdersFromLast7DaysExcludingWeekends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Op } = require('sequelize');
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);
        const ordersCount = yield orders_1.default.findAll({
            attributes: [
                'fecha',
                [connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total'] // Contar el número total de OT por fecha
            ],
            where: {
                fecha: {
                    [Op.between]: [sevenDaysAgo, today], // Filtrar órdenes entre hace 7 días y hoy
                },
                [Op.and]: connection_1.default.where(connection_1.default.fn('DAYOFWEEK', connection_1.default.col('fecha')), {
                    [Op.notIn]: [1, 7], // Excluir sábados (7) y domingos (1) en MySQL (1 es domingo, 7 es sábado)
                })
            },
            group: ['fecha'], // Agrupar por fecha
            order: [['fecha', 'ASC']] // Ordenar por fecha en orden ascendente
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersFromLast7DaysExcludingWeekends = getOrdersFromLast7DaysExcludingWeekends;
const getOrdersByMonthAndYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: [
                [connection_1.default.fn('YEAR', connection_1.default.col('fecha')), 'año'], // Extraer el año de la fecha
                [connection_1.default.fn('MONTH', connection_1.default.col('fecha')), 'mes'], // Extraer el mes de la fecha
                [connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total'] // Contar el número total de OT por mes y año
            ],
            group: ['año', 'mes'], // Agrupar por año y mes
            order: [['año', 'ASC'], ['mes', 'ASC']] // Ordenar por año y mes en orden ascendente
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersByMonthAndYear = getOrdersByMonthAndYear;
const getOrdersBy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: ['rut_usuario', [connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número de órdenes por estado
            group: ['rut_usuario'], // Agrupar por el campo 'estado'
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersBy = getOrdersBy;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield orders_1.default.findByPk(id, {
            include: [
                { model: equipo_1.default },
                { model: cliente_1.default },
                { model: usuario_1.default },
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
    const { fecha, costo, descripcion, rut_cliente, rut_usuario, id_serv, num_equipo } = req.body;
    try {
        const newOrder = yield orders_1.default.create({
            fecha,
            costo,
            descripcion,
            rut_cliente, // Incluye id_cliente en la creación
            rut_usuario, // Incluye rut_usuario
            id_serv, // Incluye id_serv
            num_equipo, // Incluye num_equipo
        });
        res.json({
            msg: 'La orden fue agregada con éxito!',
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
    const { body } = req;
    const { id } = req.params;
    try {
        const order = yield orders_1.default.findByPk(id);
        if (order) {
            yield order.update(body); // El body incluye ahora id_cliente, rut_usuario, etc.
            res.json({
                msg: 'La orden fue actualizada con éxito'
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
