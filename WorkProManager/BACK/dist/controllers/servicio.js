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
exports.updateServicio = exports.postServicio = exports.deleteServicio = exports.getServicio = exports.getServicios = void 0;
const servicio_1 = __importDefault(require("../models/servicio")); // Asegúrate de tener el modelo de Servicio importado
const vista_count_ot_por_servicio_1 = __importDefault(require("../models/vista_count_ot_por_servicio"));
const getServicios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listServicios = yield servicio_1.default.findAll({ include: [{ model: vista_count_ot_por_servicio_1.default }] });
    res.json(listServicios);
});
exports.getServicios = getServicios;
const getServicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const servicio = yield servicio_1.default.findByPk(id);
        if (servicio) {
            res.json(servicio);
        }
        else {
            res.status(404).json({
                msg: `No existe un servicio con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error al obtener el servicio, contacta con soporte`
        });
    }
});
exports.getServicio = getServicio;
const deleteServicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const servicio = yield servicio_1.default.findByPk(id);
    if (!servicio) {
        res.status(404).json({
            msg: `No existe un servicio con el id ${id}`
        });
    }
    else {
        yield servicio.destroy();
        res.json({
            msg: 'El servicio fue eliminado con éxito!'
        });
    }
});
exports.deleteServicio = deleteServicio;
const postServicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nom_serv, tiempo_estimado } = req.body; // Extrae los datos relevantes
    try {
        // Crear el nuevo servicio sin especificar `id_servicio`
        const newServicio = yield servicio_1.default.create({
            nom_serv,
            tiempo_estimado
        });
        res.json({
            msg: 'El servicio fue agregado con éxito!',
            servicio: newServicio // Devuelve el nuevo servicio, incluyendo el id_servicio generado
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
});
exports.postServicio = postServicio;
const updateServicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const servicio = yield servicio_1.default.findByPk(id);
        if (servicio) {
            yield servicio.update(body);
            res.json({
                msg: 'El servicio fue actualizado con éxito'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un servicio con el id ${id}`
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
exports.updateServicio = updateServicio;
