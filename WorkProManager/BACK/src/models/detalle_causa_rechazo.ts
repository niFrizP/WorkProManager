import { Model, DataTypes } from 'sequelize';
import db from '../db/connection';
import sequelize from 'sequelize';
import Order from './orders';
import CausaRechazo from './causa_rechazo';

const orden_causa_rechazo = db.define('orden_causa_rechazo', {
    id_ot: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
    },
    id_rechazo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'causa_rechazo',
            key: 'id_rechazo'
        }
    },
    fecha_rechazo: {
        type: DataTypes.DATE
    },
    observaciones: {
        type: DataTypes.STRING
    },
    
}, {
    modelName: 'orden_causa_rechazo',
    tableName: 'orden_causa_rechazo',
    createdAt: false,
    updatedAt: false,
    indexes: [
        {
            unique: true,
            fields: ['id_ot', 'id_rechazo']
        }
    ]
});

orden_causa_rechazo.belongsTo(CausaRechazo, { foreignKey: 'id_rechazo' });

export default orden_causa_rechazo;
