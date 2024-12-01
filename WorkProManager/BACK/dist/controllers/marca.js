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
exports.deleteMarca = exports.updateMarca = exports.createMarca = exports.getMarcaById = exports.getMarcas = void 0;
const marca_1 = __importDefault(require("../models/marca"));
// Get all marcas
const getMarcas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const marcas = yield marca_1.default.findAll();
        res.json(marcas);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving marcas', error });
    }
});
exports.getMarcas = getMarcas;
// Get a single marca by ID
const getMarcaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const marca = yield marca_1.default.findByPk(id);
        if (marca) {
            res.json(marca);
        }
        else {
            res.status(404).json({ message: 'Marca not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving marca', error });
    }
});
exports.getMarcaById = getMarcaById;
// Create a new marca
const createMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const newMarca = yield marca_1.default.create({ name });
        res.status(201).json(newMarca);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating marca', error });
    }
});
exports.createMarca = createMarca;
// Update an existing marca
const updateMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nom_marca } = req.body;
    try {
        const marca = yield marca_1.default.findByPk(id);
        if (marca) {
            marca.nom_marca = nom_marca;
            yield marca.save();
            res.json(marca);
        }
        else {
            res.status(404).json({ message: 'Marca not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating marca', error });
    }
});
exports.updateMarca = updateMarca;
// Delete a marca
const deleteMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const marca = yield marca_1.default.findByPk(id);
        if (marca) {
            yield marca.destroy();
            res.json({ message: 'Marca deleted' });
        }
        else {
            res.status(404).json({ message: 'Marca not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting marca', error });
    }
});
exports.deleteMarca = deleteMarca;
