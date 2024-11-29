import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Asignacion from './asignacion';

const Cliente = db.define('Cliente', {
    id_cliente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_cliente: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    direccion_cliente: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    telefono_cliente: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    email_cliente: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        isEmail: true, // Valida que sea un formato de correo válido
      },
    },
  }, {
    tableName: 'cliente', // Especifica el nombre de la tabla
    timestamps: false, // No hay columnas createdAt/updatedAt
  });

  Cliente.hasMany(Cliente, { foreignKey: 'id_cliente' });
  Cliente.belongsTo(Cliente, { foreignKey: 'id_cliente', targetKey: 'id_cliente' });
  Cliente.hasMany(Asignacion, { foreignKey: 'id_cliente' });
  Cliente.belongsTo(Asignacion, { foreignKey: 'id_cliente', targetKey: 'id_cliente' });

  export default Cliente;