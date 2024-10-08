import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Order = db.define('Order', {
    id_ot: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Define que id_ot es la clave primaria
        autoIncrement: true // Si es autoincremental, añade esto
    },
    fecha: {
        type: DataTypes.DATE
    },
    equipo: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    },
    costo: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'orden_trabajo', // Especifica el nombre exacto de la tabla
    createdAt: false,
    updatedAt: false
});

export default Order;
