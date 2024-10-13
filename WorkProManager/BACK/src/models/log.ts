import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Log = db.define('Log', {
    id_log: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_ent: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_sal: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    navegador: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'log',
    createdAt: false,
    updatedAt: false
});

export default Log;
