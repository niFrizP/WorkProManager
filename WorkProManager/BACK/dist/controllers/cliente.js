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
const autenticacion_1 = require("../middleware/autenticacion");
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield (0, autenticacion_1.verificarToken)(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }
        const listClientes = yield cliente_1.default.findAll({
            attributes: [
                'rut_cli',
                'nom_cli',
                'ape_cli',
                'dir_cli',
                'tel_cli',
                'email_cli',
                'd_ver_cli'
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
const getCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut } = req.params;
    try {
        const decoded = yield (0, autenticacion_1.verificarToken)(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }
        const cliente = yield cliente_1.default.findByPk(rut);
        if (cliente) {
            res.json(cliente);
        }
        else {
            res.status(404).json({
                msg: `No existe un cliente con el RUT ${rut}`
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
const postCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut_cli, nom_cli, ape_cli, dir_cli, tel_cli, email_cli, d_ver_cli } = req.body;
    try {
        const decoded = yield (0, autenticacion_1.verificarToken)(req);
        if (!decoded || !(0, autenticacion_1.verificarRol)(decoded, [1, 2])) { // Solo admin y gestor
            return res.status(403).json({
                msg: 'No tiene permisos para crear clientes'
            });
        }
        // Verificar si ya existe el cliente
        const clienteExistente = yield cliente_1.default.findByPk(rut_cli);
        if (clienteExistente) {
            return res.status(400).json({
                msg: `Ya existe un cliente con el RUT ${rut_cli}`
            });
        }
        const cliente = yield cliente_1.default.create({
            rut_cli,
            nom_cli,
            ape_cli,
            dir_cli,
            tel_cli,
            email_cli,
            d_ver_cli
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
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut } = req.params;
    const { nom_cli, ape_cli, dir_cli, tel_cli, email_cli, d_ver_cli } = req.body;
    try {
        const decoded = yield (0, autenticacion_1.verificarToken)(req);
        if (!decoded || !(0, autenticacion_1.verificarRol)(decoded, [1, 2])) {
            return res.status(403).json({
                msg: 'No tiene permisos para actualizar clientes'
            });
        }
        const cliente = yield cliente_1.default.findByPk(rut);
        if (!cliente) {
            return res.status(404).json({
                msg: `No existe un cliente con el RUT ${rut}`
            });
        }
        yield cliente.update({
            nom_cli,
            ape_cli,
            dir_cli,
            tel_cli,
            email_cli,
            d_ver_cli
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
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut } = req.params;
    try {
        const decoded = yield (0, autenticacion_1.verificarToken)(req);
        if (!decoded || !(0, autenticacion_1.verificarRol)(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para eliminar clientes'
            });
        }
        const cliente = yield cliente_1.default.findByPk(rut);
        if (!cliente) {
            return res.status(404).json({
                msg: `No existe un cliente con el RUT ${rut}`
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
