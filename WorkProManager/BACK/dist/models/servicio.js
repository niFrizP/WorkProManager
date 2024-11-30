"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Servicio = connection_1.default.define('Servicio', {
    id_serv: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    nom_serv: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: 'servicio',
    timestamps: false,
});
exports.default = Servicio;
