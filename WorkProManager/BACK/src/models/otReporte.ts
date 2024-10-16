import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Order from './orders';
import Reporte from './reporte';

class OtReporte extends Model {}

// Define el modelo "OtReporte" en base a la tabla "ot_reporte"
OtReporte.init({
    id_ot: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'orders', // Nombre de la tabla a la que hace referencia
            key: 'id_ot'
        }
    },
    idreporte: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'reporte', // Nombre de la tabla a la que hace referencia
            key: 'idreporte'
        }
    }
}, {
    sequelize: db,
    tableName: 'ot_reporte',
    timestamps: false // Para desactivar las columnas de createdAt y updatedAt
});

// Definir las asociaciones
OtReporte.belongsTo(Order, { foreignKey: 'id_ot', targetKey: 'id_ot' });
OtReporte.belongsTo(Reporte, { foreignKey: 'idreporte', targetKey: 'idreporte' });

export default OtReporte;
