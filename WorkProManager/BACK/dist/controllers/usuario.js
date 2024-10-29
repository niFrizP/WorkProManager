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
exports.updateUsuario = exports.postUsuario = exports.deleteUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const autenticacion_1 = require("../middleware/autenticacion");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield (0, autenticacion_1.verificarToken)(req);
        if (!decoded) {
            return res.status(401).json({ msg: "No autorizado" });
        }
        if (!(0, autenticacion_1.esAdmin)(decoded)) {
            return res.status(403).json({ msg: "No tienes permisos para realizar esta acción" });
        }
        const listUsuarios = yield usuario_1.default.findAll();
        res.json(listUsuarios);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener usuarios" });
    }
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const decoded = yield (0, autenticacion_1.verificarToken)(req);
        if (!decoded) {
            return res.status(401).json({ msg: "No autorizado" });
        }
        if (decoded.id_usuario.toString() !== id && !(0, autenticacion_1.esAdmin)(decoded)) {
            return res.status(403).json({ msg: "No tienes permisos para ver este usuario" });
        }
        const usuario = yield usuario_1.default.findByPk(id);
        if (usuario) {
            res.json(usuario);
        }
        else {
            res.status(404).json({ msg: "No existe un usuario con ese ID ${id}" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener usuario" });
    }
});
exports.getUsuario = getUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
    else {
        yield usuario.destroy();
        res.json({
            msg: 'El usuario fue eliminado con éxito!'
        });
    }
});
exports.deleteUsuario = deleteUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut_usuario, d_veri_usu, nom_usu, ap_usu, email_usu, cel_usu, password, id_rol } = req.body; // Extrae los datos relevantes
    try {
        // Crear el nuevo usuario sin especificar `rut_usuario`
        const newUsuario = yield usuario_1.default.create({
            rut_usuario,
            d_veri_usu,
            nom_usu,
            ap_usu,
            email_usu,
            cel_usu,
            password,
            id_rol
        });
        res.json({
            msg: 'El usuario fue agregado con éxito!',
            usuario: newUsuario // Devuelve el nuevo usuario, incluyendo el rut_usuario generado
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
});
exports.postUsuario = postUsuario;
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const decoded = yield (0, autenticacion_1.verificarToken)(req);
        if (!decoded) {
            return res.status(401).json({ msg: "No autorizado" });
        }
        if (!(0, autenticacion_1.esAdmin)(decoded)) {
            return res.status(403).json({ msg: "No tienes permisos para eliminar usuarios" });
        }
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ msg: "No existe usuario con el ID ${id}" });
        }
        yield usuario.destroy();
        res.json({ msg: "Usuario eliminado con éxito" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al eliminar usuario" });
    }
});
exports.updateUsuario = updateUsuario;
