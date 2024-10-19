"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// Definición del modelo EstadoOT en lugar de Equipo
const EstadoOT = connection_1.default.define('EstadoOT', {
    id_estado_ot: {
        type: sequelize_1.DataTypes.INTEGER, // El tipo de dato es un entero
        primaryKey: true, // Define que id_estado es la clave primaria
        autoIncrement: true // Indica que se incrementa automáticamente
    },
    tipo_est: {
        type: sequelize_1.DataTypes.STRING // Define el tipo de estado como una cadena de caracteres
    }
}, {
    tableName: 'estado_ot', // Especifica el nombre exacto de la tabla en la base de datos
    createdAt: false, // Desactiva el timestamp de creación
    updatedAt: false // Desactiva el timestamp de actualización
});
EstadoOT.hasMany(EstadoOT, { foreignKey: 'id_estado_ot' });
exports.default = EstadoOT;
