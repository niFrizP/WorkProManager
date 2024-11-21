import { DataTypes } from 'sequelize';
import db from '../db/connection';

const CausaRechazo = db.define('Causa_rechazo', {
    id_rechazo: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Define que id_marca es la clave primaria
        autoIncrement: true // Se puede agregar esto si es autoincremental
    },
    nombre_rechazo: {
        type: DataTypes.STRING,
        allowNull: false // Asegura que no sea nulo
    }
}, {
    tableName: 'causa_rechazo', // Especifica el nombre exacto de la tabla
    createdAt: false,
    updatedAt: false
});

export default CausaRechazo;
