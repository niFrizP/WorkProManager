"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection")); // Connection to the database
// Define the EstadoOT model
class EstadoOT extends sequelize_1.Model {
}
EstadoOT.init({
    id_estado: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nom_estado: {
        type: sequelize_1.DataTypes.ENUM('Cotización y revisión', 'Confirmando cotización con el cliente', 'Servicios siendo realizados', 'Orden Realizada', 'Orden Rechazada'),
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    modelName: 'EstadoOT',
    tableName: 'estado_ot',
    timestamps: false, // As the SQL definition doesn't use timestamps
});
exports.default = EstadoOT;
