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
exports.deleteOrder = exports.updateOrder = exports.postOrder = exports.getOrder = exports.getOrders = void 0;
const order_1 = __importDefault(require("../models/order"));
const cliente_1 = __importDefault(require("../models/cliente"));
const equipo_1 = __importDefault(require("../models/equipo"));
const estado_ot_1 = __importDefault(require("../models/estado_ot"));
const servicio_1 = __importDefault(require("../models/servicio"));
const historial_servicio_orden_1 = __importDefault(require("../models/historial_servicio_orden"));
// Obtener todas las órdenes
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.default.findAll({
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nombre_cliente']
                },
                {
                    model: equipo_1.default,
                    attributes: ['tipo_equipo', 'marca', 'modelo']
                },
                {
                    model: estado_ot_1.default,
                    attributes: ['nom_estado']
                },
                {
                    model: historial_servicio_orden_1.default,
                    include: [{
                            model: servicio_1.default,
                            attributes: ['nombre_servicio']
                        }]
                }
            ],
            order: [['fecha_creacion', 'DESC']]
        });
        res.json(orders);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener las órdenes'
        });
    }
});
exports.getOrders = getOrders;
// Obtener una orden por ID
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield order_1.default.findByPk(id, {
            include: [
                {
                    model: cliente_1.default,
                    attributes: ['nombre_cliente']
                },
                {
                    model: equipo_1.default,
                    attributes: ['tipo_equipo', 'marca', 'modelo']
                },
                {
                    model: estado_ot_1.default,
                    attributes: ['nom_estado']
                },
                {
                    model: historial_servicio_orden_1.default,
                    include: [{
                            model: servicio_1.default,
                            attributes: ['nombre_servicio']
                        }]
                }
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
            msg: 'Error al obtener la orden'
        });
    }
});
exports.getOrder = getOrder;
// Crear una nueva orden
const postOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_cliente, id_equipo, descripcion, fecha_estimada, prioridad, id_estado, servicios // Array de IDs de servicios
     } = req.body;
    try {
        // Verificaciones
        const clienteExiste = yield cliente_1.default.findByPk(id_cliente);
        if (!clienteExiste) {
            return res.status(404).json({
                msg: `No existe un cliente con el ID ${id_cliente}`
            });
        }
        const equipoExiste = yield equipo_1.default.findByPk(id_equipo);
        if (!equipoExiste) {
            return res.status(404).json({
                msg: `No existe un equipo con el ID ${id_equipo}`
            });
        }
        const estadoExiste = yield estado_ot_1.default.findByPk(id_estado);
        if (!estadoExiste) {
            return res.status(404).json({
                msg: `No existe un estado con el ID ${id_estado}`
            });
        }
        // Crear la orden
        const order = yield order_1.default.create({
            id_cliente,
            id_equipo,
            descripcion,
            fecha_creacion: new Date(),
            fecha_estimada,
            prioridad,
            id_estado
        });
        // Crear registros en historial_servicio_orden si se proporcionaron servicios
        if (servicios && servicios.length > 0) {
            const historialServicios = servicios.map((id_servicio) => ({
                id_orden: order.id_orden,
                id_servicio,
                fecha_inicio: new Date()
            }));
            yield historial_servicio_orden_1.default.bulkCreate(historialServicios);
        }
        res.json(order);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear la orden'
        });
    }
});
exports.postOrder = postOrder;
// Actualizar una orden
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { descripcion, fecha_estimada, prioridad, id_estado, servicios } = req.body;
    try {
        const order = yield order_1.default.findByPk(id);
        if (!order) {
            return res.status(404).json({
                msg: `No existe una orden con el id ${id}`
            });
        }
        // Verificar estado si se está actualizando
        if (id_estado) {
            const estadoExiste = yield estado_ot_1.default.findByPk(id_estado);
            if (!estadoExiste) {
                return res.status(404).json({
                    msg: `No existe un estado con el ID ${id_estado}`
                });
            }
        }
        // Actualizar la orden
        yield order.update({
            descripcion,
            fecha_estimada,
            prioridad,
            id_estado
        });
        // Actualizar servicios si se proporcionaron
        if (servicios) {
            // Eliminar servicios existentes
            yield historial_servicio_orden_1.default.destroy({
                where: { id_orden: id }
            });
            // Crear nuevos registros de servicios
            if (servicios.length > 0) {
                const historialServicios = servicios.map((id_servicio) => ({
                    id_orden: id,
                    id_servicio,
                    fecha_inicio: new Date()
                }));
                yield historial_servicio_orden_1.default.bulkCreate(historialServicios);
            }
        }
        res.json(order);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar la orden'
        });
    }
});
exports.updateOrder = updateOrder;
// Eliminar una orden
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield order_1.default.findByPk(id);
        if (!order) {
            return res.status(404).json({
                msg: `No existe una orden con el id ${id}`
            });
        }
        // Eliminar registros relacionados en historial_servicio_orden
        yield historial_servicio_orden_1.default.destroy({
            where: { id_orden: id }
        });
        // Eliminar la orden
        yield order.destroy();
        res.json({
            msg: 'Orden eliminada con éxito'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al eliminar la orden'
        });
    }
});
exports.deleteOrder = deleteOrder;
