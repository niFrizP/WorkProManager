import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';

class vista_count_ot_por_rechazo extends Model {
public id_rechazo!: number;
public total_ot!: number;
}

vista_count_ot_por_rechazo.init(
  {

    id_rechazo: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,

  },total_ot: {
        type: DataTypes.INTEGER,
        allowNull: false,
  }


},
  {
    sequelize,
    modelName: 'vista_count_ot_por_rechazo',
    tableName: 'vista_count_ot_por_rechazo', // Nombre de la vista en la base de datos
    timestamps: false, // No tienes timestamps en la vista
  }
);

export default vista_count_ot_por_rechazo;
