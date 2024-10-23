"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Tipo_Equipo = connection_1.default.define('Tipo_Equipo', {
    id_tipo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    nom_tipo: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'tipo_equipo',
    createdAt: false,
    updatedAt: false
});
exports.default = Tipo_Equipo;
