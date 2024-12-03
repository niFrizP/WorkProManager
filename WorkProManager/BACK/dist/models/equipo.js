"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const marca_1 = __importDefault(require("./marca")); // Asegúrate de que tengas el modelo Marca definido
class Equipo extends sequelize_1.Model {
}
Equipo.init({
    id_equipo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    num_ser: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
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
            model: 'marca', // Relación con la tabla Marca
            key: 'id_marca',
        },
    },
}, {
    sequelize: connection_1.default,
    modelName: 'Equipo',
    tableName: 'equipo',
    timestamps: false,
});
// Relación con la tabla `marca`
Equipo.belongsTo(marca_1.default, {
    foreignKey: 'id_marca',
    as: 'marca',
});
exports.default = Equipo;
