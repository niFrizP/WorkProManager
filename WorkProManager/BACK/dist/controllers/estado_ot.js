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
exports.updateEstadoOT = exports.postEstadoOT = exports.deleteEstadoOT = exports.getEstadoOT = exports.getEstadosOT = void 0;
const estado_ot_1 = __importDefault(require("../models/estado_ot")); // Asegúrate de tener el modelo de EstadoOT importado
const getEstadosOT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listEstadosOT = yield estado_ot_1.default.findAll();
    res.json(listEstadosOT);
});
exports.getEstadosOT = getEstadosOT;
const getEstadoOT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const estadoOT = yield estado_ot_1.default.findByPk(id);
        if (estadoOT) {
            res.json(estadoOT);
        }
        else {
            res.status(404).json({
                msg: `No existe un estado con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error al obtener el estado, contacta con soporte`
        });
    }
});
exports.getEstadoOT = getEstadoOT;
const deleteEstadoOT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const estadoOT = yield estado_ot_1.default.findByPk(id);
    if (!estadoOT) {
        res.status(404).json({
            msg: `No existe un estado con el id ${id}`
        });
    }
    else {
        yield estadoOT.destroy();
        res.json({
            msg: 'El estado fue eliminado con éxito!'
        });
    }
});
exports.deleteEstadoOT = deleteEstadoOT;
const postEstadoOT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_est } = req.body; // Extrae los datos relevantes
    try {
        // Crear el nuevo estado sin especificar `id_estado`
        const newEstadoOT = yield estado_ot_1.default.create({
            tipo_est
        });
        res.json({
            msg: 'El estado fue agregado con éxito!',
            estado: newEstadoOT // Devuelve el nuevo estado, incluyendo el id_estado generado
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
});
exports.postEstadoOT = postEstadoOT;
const updateEstadoOT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const estadoOT = yield estado_ot_1.default.findByPk(id);
        if (estadoOT) {
            yield estadoOT.update(body);
            res.json({
                msg: 'El estado fue actualizado con éxito'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un estado con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Upps, ocurrió un error. Comuníquese con soporte`
        });
    }
});
exports.updateEstadoOT = updateEstadoOT;
