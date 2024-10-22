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
exports.deleteDetalleOtByOtId = exports.deleteDetalleOt = exports.updateDetalleOt = exports.postDetalleOt = exports.getDetalleOt = exports.getDetallesOtByOT = exports.getDetallesOt = void 0;
const detalle_ot_1 = __importDefault(require("../models/detalle_ot"));
const servicio_1 = __importDefault(require("../models/servicio"));
// Obtener todos los detalles de OT
const getDetallesOt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const detallesOt = yield detalle_ot_1.default.findAll();
        res.json(detallesOt);
    }
    catch (error) {
        console.error('Error en getDetallesOt:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getDetallesOt = getDetallesOt;
const getDetallesOtByOT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_ot } = req.params;
    try {
        const detallesOt = yield detalle_ot_1.default.findAll({
            include: [{ model: servicio_1.default, attributes: ['nom_serv'] }],
            where: { id_ot }
        });
        res.json(detallesOt);
    }
    catch (error) {
        console.error('Error en getDetallesOt:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getDetallesOtByOT = getDetallesOtByOT;
// Obtener detalle de OT por ID
const getDetalleOt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_ot, id_serv } = req.params;
    try {
        const detalleOt = yield detalle_ot_1.default.findOne({
            where: { id_ot, id_serv }
        });
        if (detalleOt) {
            res.json(detalleOt);
        }
        else {
            res.status(404).json({ message: 'Detalle de OT no encontrado' });
        }
    }
    catch (error) {
        console.error('Error en getDetalleOt:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getDetalleOt = getDetalleOt;
// Crear un nuevo detalle de OT
const postDetalleOt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_ot, id_serv, fecha_detalle, desc_detalle, rut_usuario } = req.body;
    try {
        const newDetalleOt = yield detalle_ot_1.default.create({
            id_ot,
            id_serv,
            fecha_detalle,
            desc_detalle,
            rut_usuario
        });
        res.status(201).json({
            message: 'Detalle de OT creado con éxito',
            detalleOt: newDetalleOt
        });
    }
    catch (error) {
        console.error('Error en postDetalleOt:', error);
        res.status(500).json({ message: 'Error al crear el detalle de OT' });
    }
});
exports.postDetalleOt = postDetalleOt;
// Actualizar un detalle de OT
const updateDetalleOt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_ot, id_serv } = req.params;
    const { fecha_detalle, desc_detalle, rut_usuario } = req.body;
    try {
        const detalleOt = yield detalle_ot_1.default.findOne({
            where: { id_ot, id_serv }
        });
        if (detalleOt) {
            yield detalleOt.update({
                id_ot,
                id_serv,
                fecha_detalle,
                desc_detalle,
                rut_usuario
            });
            res.json({ message: 'Detalle de OT actualizado con éxito' });
        }
        else {
            res.status(404).json({ message: 'Detalle de OT no encontrado' });
        }
    }
    catch (error) {
        console.error('Error en updateDetalleOt:', error);
        res.status(500).json({ message: 'Error al actualizar el detalle de OT' });
    }
});
exports.updateDetalleOt = updateDetalleOt;
// Eliminar un detalle de OT
const deleteDetalleOt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_ot, id_servicio } = req.params;
    try {
        const detalleOt = yield detalle_ot_1.default.findOne({
            where: { id_ot, id_servicio }
        });
        if (detalleOt) {
            yield detalleOt.destroy();
            res.json({ message: 'Detalle de OT eliminado con éxito' });
        }
        else {
            res.status(404).json({ message: 'Detalle de OT no encontrado' });
        }
    }
    catch (error) {
        console.error('Error en deleteDetalleOt:', error);
        res.status(500).json({ message: 'Error al eliminar el detalle de OT' });
    }
});
exports.deleteDetalleOt = deleteDetalleOt;
const deleteDetalleOtByOtId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_ot } = req.params;
    try {
        yield detalle_ot_1.default.destroy({
            where: { id_ot }
        });
    }
    catch (error) {
        console.error('Error en deleteDetalleOtByOtId:', error);
        res.status(500).json({ message: 'Error al eliminar el detalle de OT' });
    }
});
exports.deleteDetalleOtByOtId = deleteDetalleOtByOtId;
