"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const vista_count_ot_por_servicio_1 = __importDefault(require("./vista_count_ot_por_servicio"));
// Definición del modelo Servicio en lugar de EstadoOT
const Servicio = connection_1.default.define('Servicio', {
    id_serv: {
        type: sequelize_1.DataTypes.INTEGER, // El tipo de dato es un entero
        primaryKey: true, // Define que id_servicio es la clave primaria
        autoIncrement: true // Indica que se incrementa automáticamente
    },
    nom_serv: {
        type: sequelize_1.DataTypes.STRING // Define el tipo de servicio como una cadena de caracteres
    },
    tiempo_estimado: {
        type: sequelize_1.DataTypes.DECIMAL(1, 1) // Define el tiempo estimado como un entero
    },
}, {
    tableName: 'servicio', // Especifica el nombre exacto de la tabla en la base de datos
    createdAt: false, // Desactiva el timestamp de creación
    updatedAt: false // Desactiva el timestamp de actualización
});
Servicio.hasMany(Servicio, { foreignKey: 'id_serv' });
Servicio.belongsTo(vista_count_ot_por_servicio_1.default, { foreignKey: 'id_serv', targetKey: 'id_serv' });
exports.default = Servicio;
