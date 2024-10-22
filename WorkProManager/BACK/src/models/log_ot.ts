import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Order from './orders';


class Log_Ot extends Model {}


// Definir el modelo de 'Order'
Log_Ot.init({
    id_log_ot: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_ot: {
        type: DataTypes.INTEGER,
    },

    fec_creacion_new: {
        type: DataTypes.DATE
    },
    fec_creacion_old: {
        type: DataTypes.DATE
    },
    fec_entrega_new: {
        type: DataTypes.DATE
    },
    fec_entrega_old: {
        type: DataTypes.DATE
    },
    descripcion_new: {
        type: DataTypes.STRING
    },
    descripcion_old: {
        type: DataTypes.STRING
    },
    rut_cliente_new: {
        type: DataTypes.INTEGER,

    },
    rut_cliente_old: {
        type: DataTypes.INTEGER,
    },

    num_equipo_new: {
        type: DataTypes.INTEGER,

    },
    num_equipo_old: {
        type: DataTypes.INTEGER,

    },
    id_estado_ot_new: {
        type: DataTypes.INTEGER,

    },
    id_estado_ot_old: {
        type: DataTypes.INTEGER,

    },
    accion: {
        type: DataTypes.STRING
    }
    
}, {
    // Update the type to ModelOptions<Model<any, any>>
    sequelize: db,
    modelName: 'log_ot',
    tableName: 'log_ot',
    createdAt: false,
    updatedAt: false
});



export default Log_Ot;
