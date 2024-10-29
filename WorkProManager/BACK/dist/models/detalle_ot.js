"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const servicio_1 = __importDefault(require("./servicio"));
const Detalle_Ot = connection_1.default.define('detalle_ot', {
    id_ot: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    id_serv: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'servicio',
            key: 'id_serv'
        }
    },
    fecha_detalle: {
        type: sequelize_1.DataTypes.DATE
    },
    desc_detalle: {
        type: sequelize_1.DataTypes.STRING
    },
    rut_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'usuario',
            key: 'rut_usuario'
        }
    },
    d_estado: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    modelName: 'detalle_ot',
    tableName: 'detalle_ot',
    createdAt: false,
    updatedAt: false,
    indexes: [
        {
            unique: true,
            fields: ['id_ot', 'id_serv']
        }
    ]
});
Detalle_Ot.belongsTo(servicio_1.default, { foreignKey: 'id_serv' });
exports.default = Detalle_Ot;
