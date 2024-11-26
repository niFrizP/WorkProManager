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
exports.updateMarca = exports.postMarca = exports.deleteMarca = exports.getMarca = exports.getMarcas = void 0;
const marca_1 = __importDefault(require("../models/marca"));
const vista_count_marca_1 = __importDefault(require("../models/vista_count_marca"));
const getMarcas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listMarcas = yield marca_1.default.findAll({ include: [{ model: vista_count_marca_1.default }] });
        res.json(listMarcas);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener las marcas, contacta con soporte'
        });
    }
});
exports.getMarcas = getMarcas;
const getMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const marca = yield marca_1.default.findByPk(id);
        if (marca) {
            res.json(marca);
        }
        else {
            res.status(404).json({
                msg: `No existe una marca con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener la marca, contacta con soporte'
        });
    }
});
exports.getMarca = getMarca;
const deleteMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const marca = yield marca_1.default.findByPk(id);
    if (!marca) {
        res.status(404).json({
            msg: `No existe una marca con el id ${id}`
        });
    }
    else {
        yield marca.destroy();
        res.json({
            msg: 'La marca fue eliminada con éxito!'
        });
    }
});
exports.deleteMarca = deleteMarca;
const postMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nom_marca } = req.body; // Extrae el dato relevante
    try {
        const newMarca = yield marca_1.default.create({
            nom_marca
        });
        res.json({
            msg: 'La marca fue agregada con éxito!',
            marca: newMarca // Devuelve la nueva marca, incluyendo el id_marca generado
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
});
exports.postMarca = postMarca;
const updateMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const marca = yield marca_1.default.findByPk(id);
        if (marca) {
            yield marca.update(body);
            res.json({
                msg: 'La marca fue actualizada con éxito'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe una marca con el id ${id}`
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
exports.updateMarca = updateMarca;
