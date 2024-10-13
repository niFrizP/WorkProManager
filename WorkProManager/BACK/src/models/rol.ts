import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Rol = db.define('Rol', {
    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Define que id_rol es la clave primaria
        autoIncrement: true // Si es autoincremental, añade esto
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false // Asegúrate de que el rol no sea nulo
    }
}, {
    tableName: 'rol', // Especifica el nombre exacto de la tabla
    createdAt: false,
    updatedAt: false
});

export default Rol;
