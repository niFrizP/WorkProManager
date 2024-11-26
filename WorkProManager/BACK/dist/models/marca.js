"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const vista_count_marca_1 = __importDefault(require("./vista_count_marca"));
const Marca = connection_1.default.define('Marca', {
    id_marca: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true, // Define que id_marca es la clave primaria
        autoIncrement: true // Se puede agregar esto si es autoincremental
    },
    nom_marca: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false // Asegura que no sea nulo
    }
}, {
    tableName: 'marca', // Especifica el nombre exacto de la tabla
    createdAt: false,
    updatedAt: false
});
Marca.belongsTo(vista_count_marca_1.default, { foreignKey: 'id_marca', targetKey: 'id_marca' });
exports.default = Marca;
