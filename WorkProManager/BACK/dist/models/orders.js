"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const cliente_1 = __importDefault(require("./cliente")); // Importa el modelo Cliente
const equipo_1 = __importDefault(require("./equipo")); // Importa el modelo Equipo
const connection_1 = __importDefault(require("../db/connection"));
const solicitud_1 = __importDefault(require("./solicitud"));
const vistamin_1 = __importDefault(require("./vistamin"));
const vistatecnico_1 = __importDefault(require("./vistatecnico"));
const vistaultimousuario_1 = __importDefault(require("./vistaultimousuario"));
const vistatiemposestimados_1 = __importDefault(require("./vistatiemposestimados"));
class Order extends sequelize_1.Model {
}
// Definir el modelo de 'Order'
Order.init({
    id_ot: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        references: {
            model: 'solicitud',
            key: 'id_ot'
        }
    },
    fec_creacion: {
        type: sequelize_1.DataTypes.DATE
    },
    fec_entrega: {
        type: sequelize_1.DataTypes.DATE
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
    num_equipo: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'equipo',
            key: 'num_equipo'
        }
    },
}, {
    // Update the type to ModelOptions<Model<any, any>>
    sequelize: connection_1.default,
    modelName: 'orden_trabajo',
    tableName: 'orden_trabajo',
    createdAt: false,
    updatedAt: false
});
// Definir las relaciones
Order.belongsTo(cliente_1.default, { foreignKey: 'rut_cliente', targetKey: 'rut_cliente' });
Order.belongsTo(solicitud_1.default, { foreignKey: 'id_ot', targetKey: 'id_ot' });
Order.belongsTo(equipo_1.default, { foreignKey: 'num_equipo', targetKey: 'num_equipo' });
Order.hasMany(Order, { foreignKey: 'id_ot' });
Order.belongsTo(vistamin_1.default, { foreignKey: 'id_ot', targetKey: 'id_ot' });
Order.belongsTo(vistaultimousuario_1.default, { foreignKey: 'id_ot', targetKey: 'id_ot' });
Order.belongsTo(vistatecnico_1.default, { foreignKey: 'id_ot', targetKey: 'id_ot' });
Order.hasMany(solicitud_1.default, { foreignKey: 'id_ot' }); // Cambiado a hasMany
Order.belongsTo(vistatiemposestimados_1.default, { foreignKey: 'id_ot', targetKey: 'id_ot' });
exports.default = Order;
