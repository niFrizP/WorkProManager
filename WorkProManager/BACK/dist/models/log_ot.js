"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Log_Ot extends sequelize_1.Model {
}
// Definir el modelo de 'Order'
Log_Ot.init({
    id_log_ot: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_ot: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    fec_creacion_new: {
        type: sequelize_1.DataTypes.DATE
    },
    fec_creacion_old: {
        type: sequelize_1.DataTypes.DATE
    },
    fec_entrega_new: {
        type: sequelize_1.DataTypes.DATE
    },
    fec_entrega_old: {
        type: sequelize_1.DataTypes.DATE
    },
    descripcion_new: {
        type: sequelize_1.DataTypes.STRING
    },
    descripcion_old: {
        type: sequelize_1.DataTypes.STRING
    },
    rut_cliente_new: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    rut_cliente_old: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    num_equipo_new: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    num_equipo_old: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_estado_ot_new: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_estado_ot_old: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    accion: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    // Update the type to ModelOptions<Model<any, any>>
    sequelize: connection_1.default,
    modelName: 'log_ot',
    tableName: 'log_ot',
    createdAt: false,
    updatedAt: false
});
exports.default = Log_Ot;
