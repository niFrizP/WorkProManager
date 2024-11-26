import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';

class vista_count_ot_por_servicio extends Model {
public id_serv!: number;
public total_ot!: number;
}

vista_count_ot_por_servicio.init(
  {

    id_serv: {
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
    modelName: 'vista_count_ot_por_servicio',
    tableName: 'vista_count_ot_por_servicio', // Nombre de la vista en la base de datos
    timestamps: false, // No tienes timestamps en la vista
  }
);

export default vista_count_ot_por_servicio;
