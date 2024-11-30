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
exports.deleteServicio = exports.updateServicio = exports.createServicio = exports.getServicioById = exports.getServicios = void 0;
const servicio_1 = __importDefault(require("../models/servicio"));
// Obtener todos los servicios
const getServicios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const servicios = yield servicio_1.default.findAll();
        res.json(servicios);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving servicios', error });
    }
});
exports.getServicios = getServicios;
// Obtener un servicio por ID
const getServicioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const servicio = yield servicio_1.default.findByPk(id);
        if (servicio) {
            res.json(servicio);
        }
        else {
            res.status(404).json({ message: 'Servicio not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving servicio', error });
    }
});
exports.getServicioById = getServicioById;
// Crear un nuevo servicio
const createServicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nom_serv, activo } = req.body;
    try {
        const newServicio = yield servicio_1.default.create({ nom_serv, activo });
        res.status(201).json(newServicio);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating servicio', error });
    }
});
exports.createServicio = createServicio;
// Actualizar un servicio existente
const updateServicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nom_serv, activo } = req.body;
    try {
        const servicio = yield servicio_1.default.findByPk(id);
        if (servicio) {
            servicio.nom_serv = nom_serv;
            servicio.activo = activo;
            yield servicio.save();
            res.json(servicio);
        }
        else {
            res.status(404).json({ message: 'Servicio not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating servicio', error });
    }
});
exports.updateServicio = updateServicio;
// Eliminar un servicio
const deleteServicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const servicio = yield servicio_1.default.findByPk(id);
        if (servicio) {
            yield servicio.destroy();
            res.json({ message: 'Servicio deleted' });
        }
        else {
            res.status(404).json({ message: 'Servicio not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting servicio', error });
    }
});
exports.deleteServicio = deleteServicio;
