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
exports.updateOrder = exports.postOrder = exports.deleteOrder = exports.getOrder = exports.getOrdersByUsuarioOrderEnProceso = exports.getOrdersEliminadas = exports.getOrdersByUsuarioOrder = exports.createSolicitudView = exports.getSolicitudesFromView = exports.countOrdersNotification = exports.getOrders = void 0;
const orders_1 = __importDefault(require("../models/orders"));
const equipo_1 = __importDefault(require("../models/equipo"));
const cliente_1 = __importDefault(require("../models/cliente"));
const usuario_1 = __importDefault(require("../models/usuario"));
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const estado_ot_1 = __importDefault(require("../models/estado_ot"));
const vistamin_1 = __importDefault(require("../models/vistamin"));
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOrders = yield orders_1.default.findAll({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true
                },
                {
                    model: usuario_1.default,
                    attributes: ['nom_usu', 'ap_usu'],
                    required: true
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },
                {
                    model: estado_ot_1.default,
                    attributes: ['nom_estado_ot'],
                    required: true
                },
                { model: vistamin_1.default,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor'],
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
exports.getOrders = getOrders;
const countOrdersNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countOrders = yield orders_1.default.count({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nom_cli', 'ap_cli'],
                    required: true,
                },
                {
                    model: usuario_1.default,
                    attributes: ['nom_usu', 'ap_usu'],
                    required: true,
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true,
                },
                {
                    model: estado_ot_1.default,
                    attributes: ['nom_estado_ot'],
                    required: true,
                },
                {
                    model: vistamin_1.default,
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
    }
    catch (error) {
        console.error('Error fetching count of orders:', error);
        res.status(500).json({
            msg: 'Error fetching count of orders',
        });
    }
});
exports.countOrdersNotification = countOrdersNotification;
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
const createSolicitudView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                    model: usuario_1.default,
                    attributes: ['nom_usu', 'ap_usu'],
                    required: true
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },
                {
                    model: estado_ot_1.default,
                    attributes: ['nom_estado_ot'],
                    required: true
                },
                { model: vistamin_1.default,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor'],
                    required: true
                },
            ], where: {
                rut_usuario: req.body.rut_usuario,
                id_estado_ot: { [sequelize_1.Op.in]: [1, 2] }, // Filtrar donde el estado no sea 5 ni 6
            }
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
        const filters = {
            id_estado_ot: { [sequelize_1.Op.in]: [6] }, // Filtrar estado específico
        };
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
                    model: usuario_1.default,
                    attributes: ['nom_usu', 'ap_usu'],
                    required: true,
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true,
                },
                {
                    model: estado_ot_1.default,
                    attributes: ['nom_estado_ot'],
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
                    model: usuario_1.default,
                    attributes: ['nom_usu', 'ap_usu'],
                    required: true
                },
                {
                    model: equipo_1.default,
                    attributes: ['mod_equipo', 'id_marca', 'id_tipo'],
                    required: true
                },
                {
                    model: estado_ot_1.default,
                    attributes: ['nom_estado_ot'],
                    required: true
                },
                { model: vistamin_1.default,
                    attributes: ['isview', 'fecha_emision', 'fecha_plazo', 'rut_remitente', 'rut_receptor'],
                    required: true
                },
            ], where: {
                rut_usuario: req.body.rut_usuario,
                id_estado_ot: { [sequelize_1.Op.in]: [3, 4] }, // Filtrar donde el estado no sea 5 ni 6
            }
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
