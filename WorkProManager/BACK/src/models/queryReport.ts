import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Usuario from './usuario';
import Order from './orders';

class QueryReport extends Model {}

// Define el modelo "QueryReport" en base a la tabla "QueryReport"
  QueryReport.init({
    idreporte: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE
    },
    descripcion: {
        type: DataTypes.STRING
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuario', // Nombre de la tabla a la que hace referencia
            key: 'id_usuario'
        }
    },
    id_ot: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // Para establecer una clave única
        references: {
          model: 'orders', // Nombre del modelo referenciado
          key: 'id_ot'
        }
    }
}, {
    sequelize: db,
    tableName: 'reporte',
    createdAt: false,
    updatedAt: false
});


QueryReport.belongsTo(Usuario, { foreignKey: 'id_usuario', targetKey: 'id_usuario' });
QueryReport.belongsTo(Order, { foreignKey: 'id_ot', targetKey: 'id_ot' });

export default QueryReport;