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
exports.deleteCliente = exports.updateCliente = exports.postCliente = exports.getCliente = exports.getClientes = void 0;
const cliente_1 = __importDefault(require("../models/cliente"));
// Obtener todos los clientes
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listClientes = yield cliente_1.default.findAll({
            attributes: [
                'id_cliente',
                'nombre_cliente',
                'direccion_cliente',
                'telefono_cliente',
                'email_cliente'
            ]
        });
        res.json(listClientes);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener los clientes'
        });
    }
});
exports.getClientes = getClientes;
// Obtener un cliente por ID
const getCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cliente = yield cliente_1.default.findByPk(id, {
            attributes: [
                'id_cliente',
                'nombre_cliente',
                'direccion_cliente',
                'telefono_cliente',
                'email_cliente'
            ]
        });
        if (cliente) {
            res.json(cliente);
        }
        else {
            res.status(404).json({
                msg: `No existe un cliente con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el cliente'
        });
    }
});
exports.getCliente = getCliente;
// Crear un nuevo cliente
const postCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_cliente, direccion_cliente, telefono_cliente, email_cliente } = req.body;
    try {
        const cliente = yield cliente_1.default.create({
            nombre_cliente,
            direccion_cliente,
            telefono_cliente,
            email_cliente
        });
        res.json(cliente);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el cliente'
        });
    }
});
exports.postCliente = postCliente;
// Actualizar un cliente
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre_cliente, direccion_cliente, telefono_cliente, email_cliente } = req.body;
    try {
        const cliente = yield cliente_1.default.findByPk(id);
        if (!cliente) {
            return res.status(404).json({
                msg: `No existe un cliente con el id ${id}`
            });
        }
        yield cliente.update({
            nombre_cliente,
            direccion_cliente,
            telefono_cliente,
            email_cliente
        });
        res.json(cliente);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el cliente'
        });
    }
});
exports.updateCliente = updateCliente;
// Eliminar un cliente
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cliente = yield cliente_1.default.findByPk(id);
        if (!cliente) {
            return res.status(404).json({
                msg: `No existe un cliente con el id ${id}`
            });
        }
        yield cliente.destroy();
        res.json({
            msg: 'Cliente eliminado con éxito'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al eliminar el cliente'
        });
    }
});
exports.deleteCliente = deleteCliente;
