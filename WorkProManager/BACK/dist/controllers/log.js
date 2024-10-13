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
exports.updateLog = exports.postLog = exports.deleteLog = exports.getLog = exports.getLogs = void 0;
const log_1 = __importDefault(require("../models/log"));
const getLogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listLogs = yield log_1.default.findAll();
    res.json(listLogs);
});
exports.getLogs = getLogs;
const getLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const log = yield log_1.default.findByPk(id);
        if (log) {
            res.json(log);
        }
        else {
            res.status(404).json({
                msg: `No existe un log con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error al obtener el log, contacta con soporte`
        });
    }
});
exports.getLog = getLog;
const deleteLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const log = yield log_1.default.findByPk(id);
    if (!log) {
        res.status(404).json({
            msg: `No existe un log con el id ${id}`
        });
    }
    else {
        yield log.destroy();
        res.json({
            msg: 'El log fue eliminado con éxito!'
        });
    }
});
exports.deleteLog = deleteLog;
const postLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fecha_ent, fecha_sal, ip, navegador } = req.body;
    try {
        const newLog = yield log_1.default.create({
            fecha_ent,
            fecha_sal,
            ip,
            navegador
        });
        res.json({
            msg: 'El log fue agregado con éxito!',
            log: newLog
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
});
exports.postLog = postLog;
const updateLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const log = yield log_1.default.findByPk(id);
        if (log) {
            yield log.update(body);
            res.json({
                msg: 'El log fue actualizado con éxito'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un log con el id ${id}`
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
exports.updateLog = updateLog;
