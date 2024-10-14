import { DataTypes, Model } from 'sequelize';
import Cliente from './cliente'; // Importa el modelo Cliente
import Usuario from './usuario'; // Importa el modelo Usuario
import Servicio from './servicio'; // Importa el modelo Servicio
import Equipo from './equipo'; // Importa el modelo Equipo
import EstadoOT from './estado_ot'; // Importa el modelo EstadoOT
import db from '../db/connection';
import Order from './orders';


class OrderEliminada extends Model {}


// Definir el modelo de 'Order'
OrderEliminada.init({
    id_ot: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE
    },
    costo: {
        type: DataTypes.INTEGER
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
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuario',
            key: 'id_usuario'
        }
    },
    id_serv: {
        type: DataTypes.INTEGER,
        references: {
            model: 'servicio',
            key: 'id_serv'
        }
    },
    num_equipo: {
        type: DataTypes.INTEGER,
        references: {
            model: 'equipo',
            key: 'num_equipo'
        }
    },
    id_estado: {
        type: DataTypes.INTEGER,
        references: {
            model: 'estado_ot',
            key: 'id_estado'
        }
    }
}, {
    // Update the type to ModelOptions<Model<any, any>>
    sequelize: db,
    modelName: 'orden_trabajo',
    tableName: 'orden_trabajo',
    createdAt: false,
    updatedAt: false
});

// Definir las relaciones
OrderEliminada.belongsTo(Cliente, { foreignKey: 'rut_cliente', targetKey: 'rut_cliente' });
OrderEliminada.belongsTo(Usuario, { foreignKey: 'id_usuario', targetKey: 'id_usuario' });
OrderEliminada.belongsTo(Servicio, { foreignKey: 'id_serv', targetKey: 'id_serv' });
OrderEliminada.belongsTo(Equipo, { foreignKey: 'num_equipo', targetKey: 'num_equipo' });
OrderEliminada.belongsTo(EstadoOT, { foreignKey: 'id_estado', targetKey: 'id_estado' });

export default OrderEliminada;
