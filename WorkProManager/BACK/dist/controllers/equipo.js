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
exports.updateEquipo = exports.postEquipo = exports.deleteEquipo = exports.getEquipo = exports.getEquipos = void 0;
const equipo_1 = __importDefault(require("../models/equipo")); // Asegúrate de tener el modelo de Equipo importado
const getEquipos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listEquipos = yield equipo_1.default.findAll();
    res.json(listEquipos);
});
exports.getEquipos = getEquipos;
const getEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const equipo = yield equipo_1.default.findByPk(id);
        if (equipo) {
            res.json(equipo);
        }
        else {
            res.status(404).json({
                msg: `No existe un equipo con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error al obtener el equipo, contacta con soporte`
        });
    }
});
exports.getEquipo = getEquipo;
const deleteEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const equipo = yield equipo_1.default.findByPk(id);
    if (!equipo) {
        res.status(404).json({
            msg: `No existe un equipo con el id ${id}`
        });
    }
    else {
        yield equipo.destroy();
        res.json({
            msg: 'El equipo fue eliminado con éxito!'
        });
    }
});
exports.deleteEquipo = deleteEquipo;
const postEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_equipo, mod_equipo, marca, fec_fabric } = req.body; // Extrae los datos relevantes
    try {
        // Crear el nuevo equipo sin especificar `id_equipo`
        const newEquipo = yield equipo_1.default.create({
            tipo_equipo, mod_equipo, marca, fec_fabric
        });
        res.json({
            msg: 'El equipo fue agregado con éxito!',
            equipo: newEquipo // Devuelve el nuevo equipo, incluyendo el id_equipo generado
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
});
exports.postEquipo = postEquipo;
const updateEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const equipo = yield equipo_1.default.findByPk(id);
        if (equipo) {
            yield equipo.update(body);
            res.json({
                msg: 'El equipo fue actualizado con éxito'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un equipo con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Upps, ocurrió un error. Comuníquese con soporte`
        });
    }
});
exports.updateEquipo = updateEquipo;
