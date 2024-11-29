"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const asignacion_1 = __importDefault(require("./asignacion"));
const Cliente = connection_1.default.define('Cliente', {
    id_cliente: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre_cliente: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    direccion_cliente: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    telefono_cliente: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: true,
    },
    email_cliente: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        validate: {
            isEmail: true, // Valida que sea un formato de correo válido
        },
    },
}, {
    tableName: 'cliente', // Especifica el nombre de la tabla
    timestamps: false, // No hay columnas createdAt/updatedAt
});
Cliente.hasMany(Cliente, { foreignKey: 'id_cliente' });
Cliente.belongsTo(Cliente, { foreignKey: 'id_cliente', targetKey: 'id_cliente' });
Cliente.hasMany(asignacion_1.default, { foreignKey: 'id_cliente' });
Cliente.belongsTo(asignacion_1.default, { foreignKey: 'id_cliente', targetKey: 'id_cliente' });
exports.default = Cliente;
