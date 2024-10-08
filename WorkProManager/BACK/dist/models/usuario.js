"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// Definición del modelo Usuario
const Usuario = connection_1.default.define('Usuario', {
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER, // El tipo de dato es un entero
        primaryKey: true, // Define que id_usuario es la clave primaria
        autoIncrement: true // Indica que se incrementa automáticamente
    },
    rut_usu: {
        type: sequelize_1.DataTypes.STRING, // Define el RUT del usuario como una cadena de caracteres
        allowNull: false // RUT no puede ser nulo
    },
    d_verificador_usu: {
        type: sequelize_1.DataTypes.STRING, // Define el dígito verificador como una cadena de caracteres
        allowNull: false // Dígito verificador no puede ser nulo
    },
    nom_usu: {
        type: sequelize_1.DataTypes.STRING, // Define el nombre del usuario como una cadena de caracteres
        allowNull: false // Nombre no puede ser nulo
    },
    correo: {
        type: sequelize_1.DataTypes.STRING, // Define el correo del usuario como una cadena de caracteres
        allowNull: true // Correo es opcional
    }
}, {
    tableName: 'usuario', // Especifica el nombre exacto de la tabla en la base de datos
    createdAt: false, // Desactiva el timestamp de creación
    updatedAt: false // Desactiva el timestamp de actualización
});
exports.default = Usuario;