"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection")); // Connection to the database
// Define the Servicio model
class Servicio extends sequelize_1.Model {
}
Servicio.init({
    id_serv: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nom_serv: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true, // Default to '1' (active)
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    modelName: 'Servicio',
    tableName: 'servicio',
    timestamps: false, // No timestamp fields are defined in the table
});
exports.default = Servicio;
