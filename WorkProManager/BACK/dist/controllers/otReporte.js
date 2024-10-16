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
exports.deleteOtReporte = exports.getOtReporteByIds = exports.getOtReportesByIds = exports.getOtReportesByOrderId = void 0;
const otReporte_1 = __importDefault(require("../models/otReporte"));
const orders_1 = __importDefault(require("../models/orders"));
const reporte_1 = __importDefault(require("../models/reporte"));
// Obtener todas las relaciones por id_ot
const getOtReportesByOrderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_ot, idreporte } = req.params;
    try {
        const otReportes = yield otReporte_1.default.findAll({
            where: { id_ot, idreporte },
            include: [orders_1.default, reporte_1.default] // Para obtener los datos asociados
        });
        if (otReportes.length === 0) {
            return res.status(404).json({ msg: `No se encontraron reportes para la orden con id_ot: ${id_ot} ${idreporte}` });
        }
        res.json(otReportes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener las relaciones por id_ot',
            error
        });
    }
});
exports.getOtReportesByOrderId = getOtReportesByOrderId;
const getOtReportesByIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_ot, idreporte } = req.params; // Get both parameters
    try {
        const otReportes = yield otReporte_1.default.findAll({
            where: {
                id_ot,
                idreporte // Include both primary keys in the query
            },
            include: [orders_1.default, reporte_1.default] // To get associated data
        });
        if (otReportes.length === 0) {
            return res.status(404).json({ msg: `No se encontraron reportes para la orden con id_ot: ${id_ot} y idreporte: ${idreporte}` });
        }
        res.json(otReportes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener las relaciones por id_ot y idreporte',
            error
        });
    }
});
exports.getOtReportesByIds = getOtReportesByIds;
// Obtener una relación por id_ot y idreporte
const getOtReporteByIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_ot, idreporte } = req.params;
    try {
        const otReporte = yield otReporte_1.default.findOne({
            where: { id_ot, idreporte },
            include: [orders_1.default, reporte_1.default]
        });
        if (!otReporte) {
            return res.status(404).json({ msg: `No se encontró la relación con id_ot: ${id_ot} y idreporte: ${idreporte}` });
        }
        res.json(otReporte);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener la relación',
            error
        });
    }
});
exports.getOtReporteByIds = getOtReporteByIds;
// Eliminar una relación OtReporte
const deleteOtReporte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_ot, idreporte } = req.params;
    try {
        const otReporte = yield otReporte_1.default.findOne({
            where: { id_ot, idreporte }
        });
        if (!otReporte) {
            return res.status(404).json({ msg: `No se encontró la relación con id_ot: ${id_ot} y idreporte: ${idreporte}` });
        }
        yield otReporte.destroy();
        res.json({ msg: 'Relación OtReporte eliminada con éxito' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar la relación OtReporte',
            error
        });
    }
});
exports.deleteOtReporte = deleteOtReporte;
