import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Servicio = db.define('Servicio', {
    id_serv: {
        type: DataTypes.INTEGER, // El tipo de dato es un entero
        primaryKey: true, // Define que id_servicio es la clave primaria
        autoIncrement: true // Indica que se incrementa automáticamente
    },
    nom_serv: {
        type: DataTypes.STRING // Define el tipo de servicio como una cadena de caracteres
    },
    tiempo_estimado: {
        type: DataTypes.DECIMAL(1,1) // Define el tiempo estimado como un entero
    },

}, {
  tableName: 'servicio',
  timestamps: false,
});

export default Servicio;