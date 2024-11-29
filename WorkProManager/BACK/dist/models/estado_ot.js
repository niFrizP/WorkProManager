"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const asignacion_1 = __importDefault(require("./asignacion"));
const EstadoOT = connection_1.default.define('EstadoOT', {
    id_estado: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nom_estado: {
        type: sequelize_1.DataTypes.ENUM('Pendiente', 'En Proceso', 'Completada', 'Cancelada'),
        allowNull: false,
    },
}, {
    tableName: 'estado_ot', // Nombre explícito de la tabla
    timestamps: false, // No hay columnas createdAt/updatedAt
});
EstadoOT.hasMany(asignacion_1.default, { foreignKey: 'id_estado' });
asignacion_1.default.belongsTo(EstadoOT, { foreignKey: 'id_estado', targetKey: 'id_estado' });
exports.default = EstadoOT;
