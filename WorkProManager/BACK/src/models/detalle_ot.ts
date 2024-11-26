import { Model, DataTypes } from 'sequelize';
import db from '../db/connection';
import sequelize from 'sequelize';
import Servicio from './servicio';

const Detalle_Ot = db.define('detalle_ot', {
    id_ot: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    id_serv: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'servicio',
            key: 'id_serv'
        }
    },
    fecha_detalle: {
        type: DataTypes.DATE
    },
    desc_detalle: {
        type: DataTypes.STRING
    },

    d_estado: {
        type: DataTypes.INTEGER
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

Detalle_Ot.belongsTo(Servicio, { foreignKey: 'id_serv' });

export default Detalle_Ot;
