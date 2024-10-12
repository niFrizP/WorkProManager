"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Order = connection_1.default.define('Order', {
    id_ot: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true, // Define que id_ot es la clave primaria
        autoIncrement: true // Si es autoincremental, añade esto
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE
    },
    equipo: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.STRING
    },
    costo: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    tableName: 'orden_trabajo', // Especifica el nombre exacto de la tabla
    createdAt: false,
    updatedAt: false
});
exports.default = Order;
