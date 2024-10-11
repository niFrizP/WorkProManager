"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Equipo = connection_1.default.define('Equipo', {
    num_equipo: {
        type: sequelize_1.DataTypes.INTEGER, // Puede ser STRING si el número de equipo tiene caracteres especiales
        primaryKey: true, // Define que id_equipo es la clave primaria
    },
    tipo_equipo: {
        type: sequelize_1.DataTypes.STRING
    },
    mod_equipo: {
        type: sequelize_1.DataTypes.STRING
    },
    id_marca: {
        type: sequelize_1.DataTypes.INTEGER
    },
    fec_fabric: {
        type: sequelize_1.DataTypes.DATE // Para la fecha de fabricación
    }
}, {
    tableName: 'equipo', // Especifica el nombre exacto de la tabla
    createdAt: false,
    updatedAt: false
});
exports.default = Equipo;
