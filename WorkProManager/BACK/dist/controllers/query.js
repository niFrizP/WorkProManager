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
exports.updateOrder = exports.postOrder = exports.deleteOrder = exports.getOrder = exports.getOrdersBy = exports.getOrdersByMonthAndYear = exports.getOrdersFromLast7DaysExcludingWeekends = exports.getOrdersByYear = exports.getOrdersByFecha = exports.getOrdersEstadoSum = exports.getOrdersCosto = exports.getOrdersByUsuario = exports.countOrdersByDate = exports.getOrdersByEstado = void 0;
const orders_1 = __importDefault(require("../models/orders"));
const equipo_1 = __importDefault(require("../models/equipo"));
const cliente_1 = __importDefault(require("../models/cliente"));
const usuario_1 = __importDefault(require("../models/usuario"));
const servicio_1 = __importDefault(require("../models/servicio"));
const estado_ot_1 = __importDefault(require("../models/estado_ot"));
const connection_1 = __importDefault(require("../db/connection"));
const getOrdersByEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersCount = yield orders_1.default.findAll({
            attributes: ['id_estado', [connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número de órdenes por estado
            group: ['id_estado'], // Agrupar por el campo 'estado'
        });
        res.json(ordersCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getOrdersByEstado = getOrdersByEstado;
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
            attributes: ['id_usuario', [connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número de órdenes por estado
            group: ['id_usuario'], // Agrupar por el campo 'estado'
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
            group: ['id_usuario'], // Agrupar por el campo 'estado'
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
                'id_estado',
                [connection_1.default.fn('SUM', connection_1.default.col('costo')), 'total_estado'] // Sumar el valor de id_estado por usuario
            ],
            group: ['id_estado'], // Agrupar por usuario
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
            attributes: ['id_usuario', [connection_1.default.fn('COUNT', connection_1.default.col('id_ot')), 'total']], // Contar el número de órdenes por estado
            group: ['id_usuario'], // Agrupar por el campo 'estado'
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
                { model: servicio_1.default },
                { model: estado_ot_1.default }
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
    const { fecha, costo, descripcion, rut_cliente, id_usuario, id_serv, num_equipo, id_estado } = req.body;
    try {
        const newOrder = yield orders_1.default.create({
            fecha,
            costo,
            descripcion,
            rut_cliente, // Incluye id_cliente en la creación
            id_usuario, // Incluye id_usuario
            id_serv, // Incluye id_serv
            num_equipo, // Incluye num_equipo
            id_estado
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
            yield order.update(body); // El body incluye ahora id_cliente, id_usuario, etc.
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
