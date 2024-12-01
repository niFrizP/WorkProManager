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
exports.deleteEstadoOT = exports.updateEstadoOT = exports.createEstadoOT = exports.getEstadoOTById = exports.getEstadosOT = void 0;
const estado_ot_1 = __importDefault(require("../models/estado_ot")); // Importar el modelo EstadoOT
// Obtener todos los estados de orden de trabajo
const getEstadosOT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estadosOT = yield estado_ot_1.default.findAll();
        res.json(estadosOT);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving estados', error });
    }
});
exports.getEstadosOT = getEstadosOT;
// Obtener un estado de orden de trabajo por ID
const getEstadoOTById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_estado } = req.params;
    try {
        const estadoOT = yield estado_ot_1.default.findByPk(id_estado);
        if (estadoOT) {
            res.json(estadoOT);
        }
        else {
            res.status(404).json({ message: 'Estado de OT not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving estado', error });
    }
});
exports.getEstadoOTById = getEstadoOTById;
// Crear un nuevo estado de orden de trabajo
const createEstadoOT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nom_estado } = req.body;
    try {
        const newEstadoOT = yield estado_ot_1.default.create({ nom_estado });
        res.status(201).json(newEstadoOT);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating estado de OT', error });
    }
});
exports.createEstadoOT = createEstadoOT;
// Actualizar un estado de orden de trabajo existente
const updateEstadoOT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_estado } = req.params;
    const { nom_estado } = req.body;
    try {
        const estadoOT = yield estado_ot_1.default.findByPk(id_estado);
        if (estadoOT) {
            estadoOT.nom_estado = nom_estado;
            yield estadoOT.save();
            res.json(estadoOT);
        }
        else {
            res.status(404).json({ message: 'Estado de OT not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating estado de OT', error });
    }
});
exports.updateEstadoOT = updateEstadoOT;
// Eliminar un estado de orden de trabajo
const deleteEstadoOT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_estado } = req.params;
    try {
        const estadoOT = yield estado_ot_1.default.findByPk(id_estado);
        if (estadoOT) {
            yield estadoOT.destroy();
            res.json({ message: 'Estado de OT deleted' });
        }
        else {
            res.status(404).json({ message: 'Estado de OT not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting estado de OT', error });
    }
});
exports.deleteEstadoOT = deleteEstadoOT;
