"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const marca_1 = __importDefault(require("./marca"));
const tipo_1 = __importDefault(require("./tipo"));
const Equipo = connection_1.default.define('Equipo', {
    num_equipo: {
        type: sequelize_1.DataTypes.INTEGER, // Puede ser STRING si el número de equipo tiene caracteres especiales
        primaryKey: true, // Define que id_equipo es la clave primaria
    },
    fecha_fab: {
        type: sequelize_1.DataTypes.DATE
    },
    mod_equipo: {
        type: sequelize_1.DataTypes.STRING
    },
    id_marca: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'marca',
            key: 'nom_marca'
        }
    },
    id_tipo: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'nom_tipo',
            key: 'id_tipo'
        }
    }
}, {
    tableName: 'equipo', // Especifica el nombre exacto de la tabla
    createdAt: false,
    updatedAt: false
});
Equipo.hasMany(Equipo, { foreignKey: 'num_equipo' });
Equipo.belongsTo(marca_1.default, { foreignKey: 'id_marca', targetKey: 'id_marca' });
Equipo.belongsTo(tipo_1.default, { foreignKey: 'id_tipo', targetKey: 'id_tipo' });
exports.default = Equipo;
