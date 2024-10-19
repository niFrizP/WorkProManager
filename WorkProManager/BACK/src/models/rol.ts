import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Usuario from './usuario';

const Rol = db.define('Rol', {
    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Define que id_rol es la clave primaria
        autoIncrement: true // Si es autoincremental, añade esto
    },
    nom_rol: {
        type: DataTypes.STRING,
        allowNull: false // Asegúrate de que el rol no sea nulo
    }
}, {
    tableName: 'rol', // Especifica el nombre exacto de la tabla
    modelName: 'rol', // Especifica el nombre del modelo
    createdAt: false,
    updatedAt: false
});


export default Rol;
