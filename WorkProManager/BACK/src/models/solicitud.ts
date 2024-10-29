import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Order from './orders';
import EstadoOT from './estado_ot';

// Definición del modelo EstadoOT en lugar de Equipo
const Solicitud = db.define('Solicitud', {
    id_sol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },  
    id_ot: {
        type: DataTypes.INTEGER,
        references: {
            model: 'order',
            key: 'id_ot'
    }}, 
    desc_sol: {
        type: DataTypes.STRING
    },
    id_estado_ot: {
        type: DataTypes.INTEGER, // El tipo de dato es un entero
        references: {
            model: 'estado_ot', // Se referencia al modelo EstadoOT
            key: 'id_estado_ot' // La llave primaria de EstadoOT
        }
    },
  
}, {
    tableName: 'solicitud', // Especifica el nombre exacto de la tabla en la base de datos
    createdAt: false, // Desactiva el timestamp de creación
    updatedAt: false // Desactiva el timestamp de actualización
});

Solicitud.belongsTo(Order, { foreignKey: 'id_ot' });
Solicitud.belongsTo(EstadoOT, { foreignKey: 'id_estado_ot' });
export default Solicitud;
