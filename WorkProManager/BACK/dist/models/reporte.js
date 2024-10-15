"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const usuario_1 = __importDefault(require("./usuario"));
const orders_1 = __importDefault(require("./orders"));
class Reporte extends sequelize_1.Model {
}
// Define el modelo "Reporte" en base a la tabla "reporte"
Reporte.init({
    idreporte: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'usuario', // Nombre de la tabla a la que hace referencia
            key: 'id_usuario'
        }
    },
    id_ot: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true, // Para establecer una clave única
        references: {
            model: 'orders', // Nombre del modelo referenciado
            key: 'id_ot'
        }
    }
}, {
    sequelize: connection_1.default,
    tableName: 'reporte',
    createdAt: false,
    updatedAt: false
});
Reporte.belongsTo(usuario_1.default, { foreignKey: 'id_usuario', targetKey: 'id_usuario' });
Reporte.belongsTo(orders_1.default, { foreignKey: 'id_ot', targetKey: 'id_ot' });
exports.default = Reporte;
