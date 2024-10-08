"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Log = connection_1.default.define('Log', {
    id_log: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_ent: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    fecha_sal: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    ip: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    navegador: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'log',
    createdAt: false,
    updatedAt: false
});
exports.default = Log;
