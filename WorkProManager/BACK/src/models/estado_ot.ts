import { DataTypes } from 'sequelize';
import db from '../db/connection';

// Definición del modelo EstadoOT en lugar de Equipo
const EstadoOT = db.define('EstadoOT', {
    id_estado: {
        type: DataTypes.INTEGER, // El tipo de dato es un entero
        primaryKey: true, // Define que id_estado es la clave primaria
        autoIncrement: true // Indica que se incrementa automáticamente
    },
    tipo_est: {
        type: DataTypes.STRING // Define el tipo de estado como una cadena de caracteres
    }
}, {
    tableName: 'estado_ot', // Especifica el nombre exacto de la tabla en la base de datos
    createdAt: false, // Desactiva el timestamp de creación
    updatedAt: false // Desactiva el timestamp de actualización
});

export default EstadoOT;