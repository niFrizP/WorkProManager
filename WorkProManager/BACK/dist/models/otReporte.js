"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const orders_1 = __importDefault(require("./orders"));
const reporte_1 = __importDefault(require("./reporte"));
class OtReporte extends sequelize_1.Model {
}
// Define el modelo "OtReporte" en base a la tabla "ot_reporte"
OtReporte.init({
    id_ot: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'orders', // Nombre de la tabla a la que hace referencia
            key: 'id_ot'
        }
    },
    idreporte: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'reporte', // Nombre de la tabla a la que hace referencia
            key: 'idreporte'
        }
    }
}, {
    sequelize: connection_1.default,
    tableName: 'ot_reporte',
    timestamps: false // Para desactivar las columnas de createdAt y updatedAt
});
// Definir las asociaciones
OtReporte.belongsTo(orders_1.default, { foreignKey: 'id_ot', targetKey: 'id_ot' });
OtReporte.belongsTo(reporte_1.default, { foreignKey: 'idreporte', targetKey: 'idreporte' });
exports.default = OtReporte;
