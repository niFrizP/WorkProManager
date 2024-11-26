import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Usuario from './usuario';
import Order from './orders';

const adjudicacion = db.define('adjudicacion', {
    id_adjudicacion: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Define que id_marca es la clave primaria
        autoIncrement: true // Se puede agregar esto si es autoincremental
    },
    rut_usuario: {
        type: DataTypes.STRING,
        allowNull: false, // Asegura que no sea nulo
        references: {
            model: 'usuario',
            key: 'rut_usuario'
        }
    },
    id_ot: {
        type: DataTypes.INTEGER,
        allowNull: false, // Asegura que no sea nulo
        references: {
            model: 'orden_trabajo',
            key: 'id_ot'
        }
    },
    fecha_adjudicacion: {
        type: DataTypes.DATE,
        allowNull: false // Asegura que no sea nulo
    },
}, {
    tableName: 'adjudicacion', // Especifica el nombre exacto de la tabla
    createdAt: false,
    updatedAt: false
});

adjudicacion.belongsTo(Usuario, { foreignKey: 'rut_usuario' });
adjudicacion.belongsTo(Order, { foreignKey: 'id_ot' });

export default adjudicacion;
