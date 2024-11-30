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
exports.deleteEquipo = exports.updateEquipo = exports.postEquipo = exports.getEquipo = exports.getEquipos = void 0;
const equipo_1 = __importDefault(require("../models/equipo"));
const marca_1 = __importDefault(require("../models/marca"));
const autenticacion_1 = require("../middleware/autenticacion");
const getEquipos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield (0, autenticacion_1.verificarToken)(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }
        const listEquipos = yield equipo_1.default.findAll({
            include: [{
                    model: marca_1.default,
                    attributes: ['nom_marca']
                }],
            attributes: [
                'num_ser',
                'tip_equ',
                'mod_equ',
                'id_marca'
            ]
        });
        res.json(listEquipos);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener los equipos'
        });
    }
});
exports.getEquipos = getEquipos;
const getEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { num_ser } = req.params;
    try {
        const decoded = yield (0, autenticacion_1.verificarToken)(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }
        const equipo = yield equipo_1.default.findByPk(num_ser, {
            include: [{
                    model: marca_1.default,
                    attributes: ['nom_marca']
                }]
        });
        if (equipo) {
            res.json(equipo);
        }
        else {
            res.status(404).json({
                msg: `No existe un equipo con el número de serie ${num_ser}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el equipo'
        });
    }
});
exports.getEquipo = getEquipo;
const postEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { num_ser, tip_equ, mod_equ, id_marca } = req.body;
    try {
        const decoded = yield (0, autenticacion_1.verificarToken)(req);
        if (!decoded || !(0, autenticacion_1.verificarRol)(decoded, [1, 2])) { // Solo admin y gestor
            return res.status(403).json({
                msg: 'No tiene permisos para crear equipos'
            });
        }
        // Verificar si ya existe el equipo
        const equipoExiste = yield equipo_1.default.findByPk(num_ser);
        if (equipoExiste) {
            return res.status(400).json({
                msg: `Ya existe un equipo con el número de serie ${num_ser}`
            });
        }
        // Verificar si existe la marca
        if (id_marca) {
            const marcaExiste = yield marca_1.default.findByPk(id_marca);
            if (!marcaExiste) {
                return res.status(404).json({
                    msg: `No existe una marca con el ID ${id_marca}`
                });
            }
        }
        const equipo = yield equipo_1.default.create({
            num_ser,
            tip_equ,
            mod_equ,
            id_marca
        });
        res.json(equipo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el equipo'
        });
    }
});
exports.postEquipo = postEquipo;
const updateEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { num_ser } = req.params;
    const { tip_equ, mod_equ, id_marca } = req.body;
    try {
        const decoded = yield (0, autenticacion_1.verificarToken)(req);
        if (!decoded || !(0, autenticacion_1.verificarRol)(decoded, [1, 2])) {
            return res.status(403).json({
                msg: 'No tiene permisos para actualizar equipos'
            });
        }
        const equipo = yield equipo_1.default.findByPk(num_ser);
        if (!equipo) {
            return res.status(404).json({
                msg: `No existe un equipo con el número de serie ${num_ser}`
            });
        }
        // Verificar si existe la marca
        if (id_marca) {
            const marcaExiste = yield marca_1.default.findByPk(id_marca);
            if (!marcaExiste) {
                return res.status(404).json({
                    msg: `No existe una marca con el ID ${id_marca}`
                });
            }
        }
        yield equipo.update({
            tip_equ,
            mod_equ,
            id_marca
        });
        res.json(equipo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el equipo'
        });
    }
});
exports.updateEquipo = updateEquipo;
const deleteEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { num_ser } = req.params;
    try {
        const decoded = yield (0, autenticacion_1.verificarToken)(req);
        if (!decoded || !(0, autenticacion_1.verificarRol)(decoded, [1])) { // Solo admin
            return res.status(403).json({
                msg: 'No tiene permisos para eliminar equipos'
            });
        }
        const equipo = yield equipo_1.default.findByPk(num_ser);
        if (!equipo) {
            return res.status(404).json({
                msg: `No existe un equipo con el número de serie ${num_ser}`
            });
        }
        yield equipo.destroy();
        res.json({
            msg: 'Equipo eliminado con éxito'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al eliminar el equipo'
        });
    }
});
exports.deleteEquipo = deleteEquipo;
