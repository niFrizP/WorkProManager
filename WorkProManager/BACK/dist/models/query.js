"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const cliente_1 = __importDefault(require("./cliente")); // Importa el modelo Cliente
const usuario_1 = __importDefault(require("./usuario")); // Importa el modelo Usuario
const servicio_1 = __importDefault(require("./servicio")); // Importa el modelo Servicio
const equipo_1 = __importDefault(require("./equipo")); // Importa el modelo Equipo
const estado_ot_1 = __importDefault(require("./estado_ot")); // Importa el modelo EstadoOT
const connection_1 = __importDefault(require("../db/connection"));
class Query extends sequelize_1.Model {
}
// Definir el modelo de 'Order'
Query.init({
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
        },
    },
    id_estado: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'estado_ot',
            key: 'id_estado'
        }
    }
}, {
    // Update the type to ModelOptions<Model<any, any>>
    sequelize: connection_1.default,
    modelName: 'orden_trabajo',
    tableName: 'orden_trabajo',
    createdAt: false,
    updatedAt: false
});
// Definir las relaciones
Query.belongsTo(cliente_1.default, { foreignKey: 'rut_cliente', targetKey: 'rut_cliente' });
Query.belongsTo(usuario_1.default, { foreignKey: 'id_usuario', targetKey: 'id_usuario' });
Query.belongsTo(servicio_1.default, { foreignKey: 'id_serv', targetKey: 'id_serv' });
Query.belongsTo(equipo_1.default, { foreignKey: 'num_equipo', targetKey: 'num_equipo' });
Query.belongsTo(estado_ot_1.default, { foreignKey: 'id_estado', targetKey: 'id_estado' });
exports.default = Query;
