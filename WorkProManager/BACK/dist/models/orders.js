"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// Definir el modelo de 'Order'
const Order = connection_1.default.define('Order', {
    id_ot: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE
    },
    costo: {
        type: sequelize_1.DataTypes.INTEGER
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    rut_cliente: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'cliente', // Nombre de la tabla a la que hace referencia
            key: 'rut_cliente'
        }
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'usuario',
            key: 'id_usuario'
        }
    },
    id_serv: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'servicio',
            key: 'id_serv'
        }
    },
    num_equipo: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'equipo',
            key: 'num_equipo'
        }
    },
    id_estado: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'estado_ot',
            key: 'id_estado'
        }
    }
}, {
    tableName: 'orden_trabajo',
    createdAt: false,
    updatedAt: false
});
exports.default = Order;
