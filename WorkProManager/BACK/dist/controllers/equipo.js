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
exports.deleteEquipo = exports.updateEquipo = exports.createEquipo = exports.getEquipoByNumSer = exports.getEquipos = void 0;
const equipo_1 = __importDefault(require("../models/equipo"));
// Obtener todos los equipos
const getEquipos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipos = yield equipo_1.default.findAll();
        res.json(equipos);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving equipos', error });
    }
});
exports.getEquipos = getEquipos;
// Obtener un equipo por número de serie
const getEquipoByNumSer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { num_ser } = req.params;
    try {
        const equipo = yield equipo_1.default.findByPk(num_ser);
        if (equipo) {
            res.json(equipo);
        }
        else {
            res.status(404).json({ message: 'Equipo not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving equipo', error });
    }
});
exports.getEquipoByNumSer = getEquipoByNumSer;
// Crear un nuevo equipo
const createEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { num_ser, tip_equ, mod_equ, id_marca } = req.body;
    try {
        const newEquipo = yield equipo_1.default.create({ num_ser, tip_equ, mod_equ, id_marca });
        res.status(201).json(newEquipo);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating equipo', error });
    }
});
exports.createEquipo = createEquipo;
// Actualizar un equipo existente
const updateEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { num_ser } = req.params;
    const { tip_equ, mod_equ, id_marca } = req.body;
    try {
        const equipo = yield equipo_1.default.findByPk(num_ser);
        if (equipo) {
            equipo.tip_equ = tip_equ;
            equipo.mod_equ = mod_equ;
            equipo.id_marca = id_marca;
            yield equipo.save();
            res.json(equipo);
        }
        else {
            res.status(404).json({ message: 'Equipo not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating equipo', error });
    }
});
exports.updateEquipo = updateEquipo;
// Eliminar un equipo
const deleteEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { num_ser } = req.params;
    try {
        const equipo = yield equipo_1.default.findByPk(num_ser);
        if (equipo) {
            yield equipo.destroy();
            res.json({ message: 'Equipo deleted' });
        }
        else {
            res.status(404).json({ message: 'Equipo not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting equipo', error });
    }
});
exports.deleteEquipo = deleteEquipo;
