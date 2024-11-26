import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Order from './orders';
import vista_count_ot_por_servicio from './vista_count_ot_por_servicio';

// Definición del modelo Servicio en lugar de EstadoOT
const Servicio = db.define('Servicio', {
    id_serv: {
        type: DataTypes.INTEGER, // El tipo de dato es un entero
        primaryKey: true, // Define que id_servicio es la clave primaria
        autoIncrement: true // Indica que se incrementa automáticamente
    },
    nom_serv: {
        type: DataTypes.STRING // Define el tipo de servicio como una cadena de caracteres
    },

}, {
    tableName: 'servicio', // Especifica el nombre exacto de la tabla en la base de datos
    createdAt: false, // Desactiva el timestamp de creación
    updatedAt: false // Desactiva el timestamp de actualización
});

Servicio.hasMany(Servicio, { foreignKey: 'id_serv' });
Servicio.belongsTo( vista_count_ot_por_servicio, {foreignKey: 'id_serv', targetKey: 'id_serv' });


export default Servicio;
