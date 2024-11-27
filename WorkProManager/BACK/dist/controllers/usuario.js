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
exports.updateUsuario = exports.postUsuario = exports.deleteUsuario = exports.getUsuario = exports.getUsuarios2 = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuarios_rol_2_con_tiempo_1 = __importDefault(require("../models/usuarios_rol_2_con_tiempo"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listUsuarios = yield usuario_1.default.findAll();
        res.json(listUsuarios);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener usuarios" });
    }
});
exports.getUsuarios = getUsuarios;
const getUsuarios2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listUsuarios = yield usuario_1.default.findAll({
            include: [usuarios_rol_2_con_tiempo_1.default],
            where: {
                id_rol: 2
            }
        });
        res.json(listUsuarios);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener usuarios" });
    }
});
exports.getUsuarios2 = getUsuarios2;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
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
    const { rut_usuario, d_veri_usu, nom_usu, ap_usu, email_usu, password, cel_usu, id_rol } = req.body; // Extrae los datos relevantes
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10); // Encriptar la contraseña
        // Crear el nuevo usuario sin especificar `id_usuario`
        // Crear el nuevo usuario sin especificar `rut_usuario`
        const newUsuario = yield usuario_1.default.create({
            rut_usuario,
            d_veri_usu,
            nom_usu,
            ap_usu,
            email_usu,
            cel_usu,
            password: hashedPassword,
            id_rol
        });
        res.json({
            msg: 'El usuario fue agregado con éxito!',
            usuario: newUsuario // Devuelve el nuevo usuario, incluyendo el id_usuario generado
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte, error post'
        });
    }
});
exports.postUsuario = postUsuario;
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (usuario) {
            yield usuario.update(body);
            res.json({ msg: "Usuario actualizado con éxito" });
        }
        else {
            res.status(404).json({ msg: "No existe un usuario con ese ID" });
        }
        if (usuario) {
            yield usuario.destroy();
            res.json({ msg: "Usuario eliminado con éxito" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al eliminar usuario" });
    }
});
exports.updateUsuario = updateUsuario;
