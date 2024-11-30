"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const EstadoOT = connection_1.default.define('EstadoOT', {
    id_estado: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nom_estado: {
        type: sequelize_1.DataTypes.ENUM('Cotización en curso', 'Verificando cotización', 'En progreso', 'Completada', 'Rechazada'),
        allowNull: false,
    },
}, {
    tableName: 'estado_ot',
    timestamps: false,
});
exports.default = EstadoOT;
