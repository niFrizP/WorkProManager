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
exports.updateOrder = exports.postOrder = exports.deleteOrder = exports.getOrder = exports.getOrders = void 0;
const orders_1 = __importDefault(require("../models/orders"));
const equipo_1 = __importDefault(require("../models/equipo"));
const cliente_1 = __importDefault(require("../models/cliente"));
const usuario_1 = __importDefault(require("../models/usuario"));
const estado_ot_1 = __importDefault(require("../models/estado_ot"));
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOrders = yield orders_1.default.findAll({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli'],
                    required: true
                },
                {
                    model: usuario_1.default,
                    attributes: ['nom_usu'],
                    required: true
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo'],
                    required: true
                },
                {
                    model: estado_ot_1.default,
                    attributes: ['nom_estado_ot'],
                    required: true
                }
            ]
        });
        console.log('Consulta de órdenes:', JSON.stringify(listOrders, null, 2)); // Log de la consulta
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
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield orders_1.default.findByPk(id, {
            include: [
                { model: equipo_1.default },
                { model: cliente_1.default },
                { model: usuario_1.default },
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
    const { fec_creacion, fec_entrega, descripcion, rut_cliente, rut_usuario, num_equipo, id_estado_ot } = req.body;
    try {
        const newOrder = yield orders_1.default.create({
            fec_creacion,
            fec_entrega,
            descripcion,
            rut_cliente, // Incluye id_cliente en la creación
            rut_usuario, // Incluye rut_usuario
            num_equipo, // Incluye num_equipo
            id_estado_ot
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
    const { id } = req.params;
    const { fec_creacion, fec_entrega, descripcion, rut_cliente, rut_usuario, num_equipo, id_estado_ot } = req.body; // Obtener los campos del cuerpo de la solicitud
    try {
        const order = yield orders_1.default.findByPk(id); // Buscar la orden por ID
        if (order) {
            // Actualizar los campos del modelo
            yield order.update({
                fec_creacion,
                fec_entrega,
                descripcion,
                rut_cliente,
                rut_usuario,
                num_equipo,
                id_estado_ot
            }); // Actualiza todos los campos proporcionados
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
