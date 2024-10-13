"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Cliente = connection_1.default.define('Cliente', {
    rut_cliente: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true, // Define que id_ot es la clave primaria
        // Si es autoincremental, añade esto
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
    tableName: 'cliente', // Especifica el nombre exacto de la tabla
    createdAt: false,
    updatedAt: false
});
exports.default = Cliente;
