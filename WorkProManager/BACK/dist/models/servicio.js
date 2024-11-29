"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const historial_servicio_orden_1 = __importDefault(require("./historial_servicio_orden"));
const Servicio = connection_1.default.define('Servicio', {
    id_servicio: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    nombre_servicio: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    descripcion_servicio: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'servicio',
    timestamps: false, // Si no usas createdAt y updatedAt
});
Servicio.hasMany(historial_servicio_orden_1.default, { foreignKey: 'id_servicio' });
historial_servicio_orden_1.default.belongsTo(Servicio, { foreignKey: 'id_servicio', targetKey: 'id_servicio' });
exports.default = Servicio;
