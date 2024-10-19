import { Model, DataTypes } from 'sequelize';
import db from '../db/connection';
import sequelize from 'sequelize';

const Detalle_Ot = db.define('detalle_ot', {
    id_ot: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    id_serv: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    fecha_detalle: {
        type: DataTypes.DATE
    },
    desc_detalle: {
        type: DataTypes.STRING
    },
    rut_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuario',
            key: 'rut_usuario'
        }
    }
}, {
    modelName: 'detalle_ot',
    tableName: 'detalle_ot',
    createdAt: false,
    updatedAt: false,
    indexes: [
        {
            unique: true,
            fields: ['id_ot', 'id_servicio']
        }
    ]
});


export default Detalle_Ot;
