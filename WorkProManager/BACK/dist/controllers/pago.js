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
exports.updatePago = exports.postPago = exports.deletePago = exports.getPago = exports.getPagos = void 0;
const pago_1 = __importDefault(require("../models/pago"));
const getPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listPagos = yield pago_1.default.findAll();
    res.json(listPagos);
});
exports.getPagos = getPagos;
const getPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pago = yield pago_1.default.findByPk(id);
        if (pago) {
            res.json(pago);
        }
        else {
            res.status(404).json({
                msg: `No existe un pago con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error al obtener el pago, contacta con soporte`
        });
    }
});
exports.getPago = getPago;
const deletePago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const pago = yield pago_1.default.findByPk(id);
    if (!pago) {
        res.status(404).json({
            msg: `No existe un pago con el id ${id}`
        });
    }
    else {
        yield pago.destroy();
        res.json({
            msg: 'El pago fue eliminado con éxito!'
        });
    }
});
exports.deletePago = deletePago;
const postPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_pago } = req.body; // Extrae los datos relevantes
    try {
        const newPago = yield pago_1.default.create({ tipo_pago });
        res.json({
            msg: 'El pago fue agregado con éxito!',
            pago: newPago // Devuelve el nuevo pago, incluyendo el id_pago generado
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
});
exports.postPago = postPago;
const updatePago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const pago = yield pago_1.default.findByPk(id);
        if (pago) {
            yield pago.update(body);
            res.json({
                msg: 'El pago fue actualizado con éxito'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un pago con el id ${id}`
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
exports.updatePago = updatePago;
