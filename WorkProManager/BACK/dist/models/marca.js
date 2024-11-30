"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection")); // Connection to the database
// Define the Marca model
class Marca extends sequelize_1.Model {
}
Marca.init({
    id_marca: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nom_marca: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true, // Nullable based on SQL schema
    },
}, {
    sequelize: connection_1.default,
    modelName: 'Marca',
    tableName: 'marca',
    timestamps: false, // As the SQL definition doesn't use timestamps
});
exports.default = Marca;
