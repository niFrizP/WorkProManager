"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection")); // Connection to the database
// Define the Equipo model
class Equipo extends sequelize_1.Model {
}
Equipo.init({
    num_ser: {
        type: sequelize_1.DataTypes.STRING(30),
        primaryKey: true,
        allowNull: false,
    },
    tip_equ: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    mod_equ: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    id_marca: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true, // Foreign key, nullable if not assigned
    },
}, {
    sequelize: connection_1.default,
    modelName: 'Equipo',
    tableName: 'equipo',
    timestamps: false, // As the SQL definition doesn't use timestamps
});
exports.default = Equipo;
