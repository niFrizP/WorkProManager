import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';

class vista_count_marca extends Model {
public id_marca!: number;
public total_equipo!: number;
}

vista_count_marca.init(
  {

    id_marca: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,

  },total_equipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
  }


},
  {
    sequelize,
    modelName: 'vista_count_marca',
    tableName: 'vista_count_marca', // Nombre de la vista en la base de datos
    timestamps: false, // No tienes timestamps en la vista
  }
);

export default vista_count_marca;
