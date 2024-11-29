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
exports.deleteServicio = exports.updateServicio = exports.postServicio = exports.getServicio = exports.getServicios = void 0;
const servicio_1 = __importDefault(require("../models/servicio"));
const getServicios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listServicios = yield servicio_1.default.findAll({
            where: { activo: true }
        });
        res.json(listServicios);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener los servicios'
        });
    }
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
            msg: 'Error al obtener el servicio'
        });
    }
});
exports.getServicio = getServicio;
const postServicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_servicio, descripcion_servicio } = req.body;
    try {
        const servicio = yield servicio_1.default.create({
            nombre_servicio,
            descripcion_servicio,
            activo: true
        });
        res.json(servicio);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el servicio'
        });
    }
});
exports.postServicio = postServicio;
const updateServicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre_servicio, descripcion_servicio } = req.body;
    try {
        const servicio = yield servicio_1.default.findByPk(id);
        if (!servicio) {
            return res.status(404).json({
                msg: `No existe un servicio con el id ${id}`
            });
        }
        yield servicio.update({
            nombre_servicio,
            descripcion_servicio
        });
        res.json(servicio);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el servicio'
        });
    }
});
exports.updateServicio = updateServicio;
const deleteServicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const servicio = yield servicio_1.default.findByPk(id);
        if (!servicio) {
            return res.status(404).json({
                msg: `No existe un servicio con el id ${id}`
            });
        }
        yield servicio.update({ activo: false });
        res.json({
            msg: 'Servicio eliminado con éxito'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al eliminar el servicio'
        });
    }
});
exports.deleteServicio = deleteServicio;
