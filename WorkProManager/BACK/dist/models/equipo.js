"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const asignacion_1 = __importDefault(require("./asignacion"));
const cliente_1 = __importDefault(require("./cliente"));
const Equipo = connection_1.default.define('Equipo', {
    numero_serie: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    tipo_equipo: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    marca: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    modelo: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
}, {
    tableName: 'equipo', // Nombre explícito de la tabla
    timestamps: false, // No hay columnas createdAt/updatedAt
});
Equipo.hasMany(asignacion_1.default, { foreignKey: 'numero_serie' });
asignacion_1.default.belongsTo(Equipo, { foreignKey: 'numero_serie', targetKey: 'numero_serie' });
Equipo.belongsTo(cliente_1.default, { foreignKey: 'id_cliente', targetKey: 'id_cliente' });
exports.default = Equipo;
