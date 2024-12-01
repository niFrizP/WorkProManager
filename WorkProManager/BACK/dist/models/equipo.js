"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const marca_1 = __importDefault(require("./marca"));
const Equipo = connection_1.default.define('Equipo', {
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
        allowNull: true,
        references: {
            model: 'marca',
            key: 'id_marca',
        },
    }
}, {
    tableName: 'equipo',
    timestamps: false,
});
Equipo.belongsTo(marca_1.default, { foreignKey: 'id_marca', targetKey: 'id_marca' });
exports.default = Equipo;
