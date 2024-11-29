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
exports.deleteEquipo = exports.updateEquipo = exports.postEquipo = exports.getEquipo = exports.getEquipos = void 0;
const equipo_1 = __importDefault(require("../models/equipo"));
const cliente_1 = __importDefault(require("../models/cliente"));
// Obtener todos los equipos
const getEquipos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listEquipos = yield equipo_1.default.findAll({
            include: [{
                    model: cliente_1.default,
                    attributes: ['nombre_cliente']
                }],
            attributes: [
                'numero_serie',
                'tipo_equipo',
                'marca',
                'modelo',
                'id_cliente'
            ]
        });
        res.json(listEquipos);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener los equipos'
        });
    }
});
exports.getEquipos = getEquipos;
// Obtener un equipo por número de serie
const getEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const equipo = yield equipo_1.default.findByPk(id, {
            include: [{
                    model: cliente_1.default,
                    attributes: ['nombre_cliente']
                }]
        });
        if (equipo) {
            res.json(equipo);
        }
        else {
            res.status(404).json({
                msg: `No existe un equipo con el número de serie ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el equipo'
        });
    }
});
exports.getEquipo = getEquipo;
// Crear un nuevo equipo
const postEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_equipo, marca, modelo, id_cliente } = req.body;
    try {
        // Verificar si el cliente existe
        const clienteExiste = yield cliente_1.default.findByPk(id_cliente);
        if (!clienteExiste) {
            return res.status(404).json({
                msg: `No existe un cliente con el ID ${id_cliente}`
            });
        }
        const equipo = yield equipo_1.default.create({
            tipo_equipo,
            marca,
            modelo,
            id_cliente
        });
        res.json(equipo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el equipo'
        });
    }
});
exports.postEquipo = postEquipo;
// Actualizar un equipo
const updateEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { tipo_equipo, marca, modelo, id_cliente } = req.body;
    try {
        const equipo = yield equipo_1.default.findByPk(id);
        if (!equipo) {
            return res.status(404).json({
                msg: `No existe un equipo con el número de serie ${id}`
            });
        }
        // Verificar si el nuevo cliente existe (si se está actualizando)
        if (id_cliente) {
            const clienteExiste = yield cliente_1.default.findByPk(id_cliente);
            if (!clienteExiste) {
                return res.status(404).json({
                    msg: `No existe un cliente con el ID ${id_cliente}`
                });
            }
        }
        yield equipo.update({
            tipo_equipo,
            marca,
            modelo,
            id_cliente
        });
        res.json(equipo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el equipo'
        });
    }
});
exports.updateEquipo = updateEquipo;
// Eliminar un equipo
const deleteEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const equipo = yield equipo_1.default.findByPk(id);
        if (!equipo) {
            return res.status(404).json({
                msg: `No existe un equipo con el número de serie ${id}`
            });
        }
        yield equipo.destroy();
        res.json({
            msg: 'Equipo eliminado con éxito'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al eliminar el equipo'
        });
    }
});
exports.deleteEquipo = deleteEquipo;
