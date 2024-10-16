"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection")); // Asegúrate de que esta ruta sea correcta
class Cliente extends sequelize_1.Model {
}
Cliente.init({
    rut_cliente: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    d_verificador_cliente: {
        type: sequelize_1.DataTypes.STRING
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING
    },
    correo: {
        type: sequelize_1.DataTypes.STRING
    },
    celular: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    sequelize: connection_1.default, // Asegúrate de que 'db' esté definido correctamente
    modelName: 'cliente',
    tableName: 'cliente', // Especifica el nombre exacto de la tabla
    createdAt: false,
    updatedAt: false
});
Cliente.hasMany(Cliente, { foreignKey: 'rut_cliente' });
exports.default = Cliente;
