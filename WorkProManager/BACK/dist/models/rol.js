"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Rol = connection_1.default.define('Rol', {
    id_rol: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true, // Define que id_rol es la clave primaria
        autoIncrement: true // Si es autoincremental, añade esto
    },
    rol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false // Asegúrate de que el rol no sea nulo
    }
}, {
    tableName: 'rol', // Especifica el nombre exacto de la tabla
    createdAt: false,
    updatedAt: false
});
exports.default = Rol;
