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
exports.updateReporte = exports.postReporte = exports.deleteReporte = exports.getReporte = exports.getReportes = void 0;
const reporte_1 = __importDefault(require("../models/reporte"));
const usuario_1 = __importDefault(require("../models/usuario"));
const getReportes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listReporte = yield reporte_1.default.findAll({
            include: [
                {
                    model: usuario_1.default,
                    attributes: ['nom_usu'],
                    required: true
                },
            ]
        });
        console.log('Consulta de órdenes:', JSON.stringify(listReporte, null, 2)); // Log de la consulta
        res.json(listReporte);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            msg: 'Error fetching orders',
        });
    }
});
exports.getReportes = getReportes;
const getReporte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const reporte = yield reporte_1.default.findByPk(id, {
            include: [
                { model: usuario_1.default },
            ]
        });
        if (reporte) {
            res.json(reporte);
        }
        else {
            res.status(404).json({
                msg: `No existe una orden con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error al obtener la orden, contacta con soporte`
        });
    }
});
exports.getReporte = getReporte;
const deleteReporte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const reporte = yield reporte_1.default.findByPk(id);
    if (!reporte) {
        res.status(404).json({
            msg: `No existe una orden con el id ${id}`
        });
    }
    else {
        yield reporte.destroy();
        res.json({
            msg: 'La orden fue eliminado con exito!'
        });
    }
});
exports.deleteReporte = deleteReporte;
const postReporte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut_usuario, fecha, descripcion, id_ot } = req.body;
    try {
        const newReporte = yield reporte_1.default.create({
            fecha,
            descripcion,
            rut_usuario,
            id_ot
        });
        res.json({
            msg: 'La orden fue agregada con éxito!',
            order: newReporte
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
});
exports.postReporte = postReporte;
const updateReporte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const reporte = yield reporte_1.default.findByPk(id);
        if (reporte) {
            yield reporte.update(body); // El body incluye ahora id_cliente, rut_usuario, etc.
            res.json({
                msg: 'La orden fue actualizada con éxito'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe una orden con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
});
exports.updateReporte = updateReporte;
