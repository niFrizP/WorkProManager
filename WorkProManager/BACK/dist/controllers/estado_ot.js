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
exports.deleteEstadoOT = exports.updateEstadoOT = exports.postEstadoOT = exports.getEstadoOT = exports.getEstadosOT = void 0;
const estado_ot_1 = __importDefault(require("../models/estado_ot"));
// Obtener todos los estados de OT
const getEstadosOT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listEstados = yield estado_ot_1.default.findAll({
            attributes: ['id_estado', 'nom_estado']
        });
        res.json(listEstados);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener los estados de OT'
        });
    }
});
exports.getEstadosOT = getEstadosOT;
// Obtener un estado de OT por ID
const getEstadoOT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const estado = yield estado_ot_1.default.findByPk(id, {
            attributes: ['id_estado', 'nom_estado']
        });
        if (estado) {
            res.json(estado);
        }
        else {
            res.status(404).json({
                msg: `No existe un estado de OT con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el estado de OT'
        });
    }
});
exports.getEstadoOT = getEstadoOT;
// Crear un nuevo estado de OT
const postEstadoOT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nom_estado } = req.body;
    try {
        // Verificar que el estado sea uno de los permitidos
        if (!['Pendiente', 'En Proceso', 'Completada', 'Cancelada'].includes(nom_estado)) {
            return res.status(400).json({
                msg: 'Estado no válido. Los estados permitidos son: Pendiente, En Proceso, Completada, Cancelada'
            });
        }
        const estado = yield estado_ot_1.default.create({
            nom_estado
        });
        res.json(estado);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el estado de OT'
        });
    }
});
exports.postEstadoOT = postEstadoOT;
// Actualizar un estado de OT
const updateEstadoOT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nom_estado } = req.body;
    try {
        const estado = yield estado_ot_1.default.findByPk(id);
        if (!estado) {
            return res.status(404).json({
                msg: `No existe un estado de OT con el id ${id}`
            });
        }
        // Verificar que el estado sea uno de los permitidos
        if (!['Pendiente', 'En Proceso', 'Completada', 'Cancelada'].includes(nom_estado)) {
            return res.status(400).json({
                msg: 'Estado no válido. Los estados permitidos son: Pendiente, En Proceso, Completada, Cancelada'
            });
        }
        yield estado.update({
            nom_estado
        });
        res.json(estado);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el estado de OT'
        });
    }
});
exports.updateEstadoOT = updateEstadoOT;
// Eliminar un estado de OT
const deleteEstadoOT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const estado = yield estado_ot_1.default.findByPk(id);
        if (!estado) {
            return res.status(404).json({
                msg: `No existe un estado de OT con el id ${id}`
            });
        }
        yield estado.destroy();
        res.json({
            msg: 'Estado de OT eliminado con éxito'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al eliminar el estado de OT'
        });
    }
});
exports.deleteEstadoOT = deleteEstadoOT;
