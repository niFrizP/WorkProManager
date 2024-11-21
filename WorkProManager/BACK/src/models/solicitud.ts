import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Order from './orders';
import EstadoOT from './estado_ot';
import Usuario from './usuario';


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
            model: 'orden_trabajo',
            key: 'id_ot'
    }}, 
    desc_sol: {
        type: DataTypes.STRING
    },
    id_estado_ot: {
        type: DataTypes.INTEGER, // El tipo de dato es un entero
        references: {
            model: 'estado_ot',
            key: 'id_estado_ot'
        }
    },
    isView: {
        type: DataTypes.BOOLEAN
    },
    fecha_vista: {
        type: DataTypes.DATE
    },
    fecha_termino: {
        type: DataTypes.DATE
    },
    fecha_emision: {
        type: DataTypes.DATE
    },
    fecha_plazo: {
        type: DataTypes.DATE
    },
    rut_usuario: {
        type: DataTypes.STRING,
        references: {
            model: 'usuario',
            key: 'rut_usuario'
        }
    },
    completada: {
        type: DataTypes.BOOLEAN
    }
  
}, {
    tableName: 'solicitud', // Especifica el nombre exacto de la tabla en la base de datos
    modelName: 'solicitud', // Nombre del modelo
    createdAt: false, // Desactiva el timestamp de creación
    updatedAt: false,// Desactiva el timestamp de actualización
});

Solicitud.belongsTo(EstadoOT, { foreignKey: 'id_estado_ot' });
Solicitud.belongsTo(Usuario, { foreignKey: 'rut_usuario' });

export default Solicitud;
