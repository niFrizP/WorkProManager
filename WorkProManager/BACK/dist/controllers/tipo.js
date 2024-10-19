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
exports.deleteTipo = exports.updateTipo = exports.postTipo = exports.getTipo = exports.getTipos = void 0;
const tipo_1 = __importDefault(require("../models/tipo"));
const getTipos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listTipos = yield tipo_1.default.findAll();
    res.json(listTipos);
});
exports.getTipos = getTipos;
const getTipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const tipo = yield tipo_1.default.findByPk(id);
    res.json(tipo);
});
exports.getTipo = getTipo;
const postTipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield tipo_1.default.create(body);
        res.json({
            msg: 'El tipo fue agregado con éxito'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
});
exports.postTipo = postTipo;
const updateTipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        yield tipo_1.default.update(body, { where: { id_tipo: id } });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
});
exports.updateTipo = updateTipo;
const deleteTipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield tipo_1.default.destroy({ where: { id_tipo: id } });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
});
exports.deleteTipo = deleteTipo;
