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
const autenticacion_1 = require("../middleware/autenticacion");
// Obtener todos los servicios activos
const getServicios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield (0, autenticacion_1.verificarToken)(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }
        const listServicios = yield servicio_1.default.findAll({
            where: { activo: true },
            attributes: ['id_serv', 'nom_serv', 'activo'],
            order: [['nom_serv', 'ASC']]
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
// Obtener un servicio por ID
const getServicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const decoded = yield (0, autenticacion_1.verificarToken)(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }
        const servicio = yield servicio_1.default.findByPk(id);
        if (servicio) {
            res.json(servicio);
        }
        else {
            res.status(404).json({
                msg: `No existe un servicio con el ID ${id}`
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
// Crear un nuevo servicio
const postServicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nom_serv } = req.body;
    try {
        const decoded = yield (0, autenticacion_1.verificarToken)(req);
        if (!decoded || !(0, autenticacion_1.verificarRol)(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para crear servicios'
            });
        }
        // Verificar si ya existe un servicio con el mismo nombre
        const servicioExiste = yield servicio_1.default.findOne({
            where: { nom_serv }
        });
        if (servicioExiste) {
            return res.status(400).json({
                msg: `Ya existe un servicio con el nombre ${nom_serv}`
            });
        }
        const servicio = yield servicio_1.default.create({
            nom_serv,
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
// Actualizar un servicio
const updateServicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nom_serv } = req.body;
    try {
        const decoded = yield (0, autenticacion_1.verificarToken)(req);
        if (!decoded || !(0, autenticacion_1.verificarRol)(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para actualizar servicios'
            });
        }
        const servicio = yield servicio_1.default.findByPk(id);
        if (!servicio) {
            return res.status(404).json({
                msg: `No existe un servicio con el ID ${id}`
            });
        }
        // Verificar si el nuevo nombre ya existe en otro servicio
        if (nom_serv) {
            const servicioExiste = yield servicio_1.default.findOne({
                where: { nom_serv }
            });
            if (servicioExiste && servicioExiste.getDataValue('id_serv') !== parseInt(id)) {
                return res.status(400).json({
                    msg: `Ya existe un servicio con el nombre ${nom_serv}`
                });
            }
        }
        yield servicio.update({ nom_serv });
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
// Desactivar un servicio (borrado lógico)
const deleteServicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const decoded = yield (0, autenticacion_1.verificarToken)(req);
        if (!decoded || !(0, autenticacion_1.verificarRol)(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para eliminar servicios'
            });
        }
        const servicio = yield servicio_1.default.findByPk(id);
        if (!servicio) {
            return res.status(404).json({
                msg: `No existe un servicio con el ID ${id}`
            });
        }
        yield servicio.update({ activo: false });
        res.json({
            msg: 'Servicio desactivado con éxito'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al desactivar el servicio'
        });
    }
});
exports.deleteServicio = deleteServicio;
