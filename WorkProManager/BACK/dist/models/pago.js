"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Pago = connection_1.default.define('Pago', {
    id_pago: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Campo autoincremental
    },
    tipo_pago: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false // No permitir nulos
    }
}, {
    tableName: 'pago', // Especifica el nombre exacto de la tabla
    createdAt: false,
    updatedAt: false
});
exports.default = Pago;
