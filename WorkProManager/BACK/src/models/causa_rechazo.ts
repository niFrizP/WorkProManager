import { DataTypes } from 'sequelize';
import db from '../db/connection';
import vista_count_ot_por_rechazo from './ot_db.vista_count_ot_por_rechazo';

const CausaRechazo = db.define('Causa_rechazo', {
    id_rechazo: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Define que id_marca es la clave primaria
        autoIncrement: true, // Asegura que el id_marca se auto incremente

    },
    nombre_rechazo: {
        type: DataTypes.STRING,
        allowNull: false // Asegura que no sea nulo
    },
    isactiva: { 
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'causa_rechazo', // Especifica el nombre exacto de la tabla
    createdAt: false,
    updatedAt: false
});

CausaRechazo.belongsTo(vista_count_ot_por_rechazo, { foreignKey: 'id_rechazo', targetKey: 'id_rechazo' });


export default CausaRechazo;
