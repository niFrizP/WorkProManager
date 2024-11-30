"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection")); // Connection to the database
// Define the Cliente model
class Cliente extends sequelize_1.Model {
}
Cliente.init({
    rut_cli: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    nom_cli: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    dir_cli: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    tel_cli: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: true,
    },
    email_cli: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    ape_cli: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    d_ver_cli: {
        type: sequelize_1.DataTypes.STRING(1),
        allowNull: true,
    },
}, {
    sequelize: connection_1.default,
    modelName: 'Cliente',
    tableName: 'cliente',
    timestamps: false, // As the SQL definition doesn't include timestamps
});
exports.default = Cliente;
