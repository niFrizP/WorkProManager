"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Equipo = connection_1.default.define('Equipo', {
    id_equipo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true, // Define que id_equipo es la clave primaria
        autoIncrement: true // Si es autoincremental, añade esto
    },
    num_equipo: {
        type: sequelize_1.DataTypes.STRING // Puede ser STRING si el número de equipo tiene caracteres especiales
    },
    tipo_equipo: {
        type: sequelize_1.DataTypes.STRING
    },
    mod_equipo: {
        type: sequelize_1.DataTypes.STRING
    },
    marca: {
        type: sequelize_1.DataTypes.STRING
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
