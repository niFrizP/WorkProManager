import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Pago = db.define('Pago', {
    id_pago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Campo autoincremental
    },
    tipo_pago: {
        type: DataTypes.STRING,
        allowNull: false // No permitir nulos
    }
}, {
    tableName: 'pago', // Especifica el nombre exacto de la tabla
    createdAt: false,
    updatedAt: false
});

export default Pago;
