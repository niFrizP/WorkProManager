"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// Definición del modelo Servicio en lugar de EstadoOT
const Servicio = connection_1.default.define('Servicio', {
    id_serv: {
        type: sequelize_1.DataTypes.INTEGER, // El tipo de dato es un entero
        primaryKey: true, // Define que id_servicio es la clave primaria
        autoIncrement: true // Indica que se incrementa automáticamente
    },
    tipo_serv: {
        type: sequelize_1.DataTypes.STRING // Define el tipo de servicio como una cadena de caracteres
    },
    precio: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    tableName: 'servicio', // Especifica el nombre exacto de la tabla en la base de datos
    createdAt: false, // Desactiva el timestamp de creación
    updatedAt: false // Desactiva el timestamp de actualización
});
exports.default = Servicio;
