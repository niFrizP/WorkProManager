import { DataTypes, Model } from 'sequelize';
import Cliente from './cliente'; // Importa el modelo Cliente
import Usuario from './usuario'; // Importa el modelo Usuario
import Servicio from './servicio'; // Importa el modelo Servicio
import Equipo from './equipo'; // Importa el modelo Equipo
import EstadoOT from './estado_ot'; // Importa el modelo EstadoOT
import db from '../db/connection';


class Order extends Model {}


// Definir el modelo de 'Order'
Order.init({
    id_ot: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fec_creacion: {
        type: DataTypes.DATE
    },
    fec_entrega: {
        type: DataTypes.DATE
    },
    descripcion: {
        type: DataTypes.STRING
    },
    rut_cliente: {
        type: DataTypes.INTEGER,
        references: {
            model: 'cliente', // Nombre de la tabla a la que hace referencia
            key: 'rut_cliente'
        }
    },
    rut_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuario',
            key: 'rut_usuario'
        }
    },

    num_equipo: {
        type: DataTypes.INTEGER,
        references: {
            model: 'equipo',
            key: 'num_equipo'
        }
    },
    id_estado_ot: {
        type: DataTypes.INTEGER,
        references: {
            model: 'estado_ot',
            key: 'id_estado_ot'
        }
    },
    
    
}, {
    // Update the type to ModelOptions<Model<any, any>>
    sequelize: db,
    modelName: 'orden_trabajo',
    tableName: 'orden_trabajo',
    createdAt: false,
    updatedAt: false
});

// Definir las relaciones
Order.belongsTo(Cliente, { foreignKey: 'rut_cliente', targetKey: 'rut_cliente' });
Order.belongsTo(Usuario, { foreignKey: 'rut_usuario', targetKey: 'rut_usuario' });
Order.belongsTo(Equipo, { foreignKey: 'num_equipo', targetKey: 'num_equipo' });
Order.belongsTo(EstadoOT, { foreignKey: 'id_estado_ot', targetKey: 'id_estado_ot' });

export default Order;
