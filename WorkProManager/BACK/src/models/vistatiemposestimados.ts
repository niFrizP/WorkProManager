import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';

class vista_tiempos_estimados_por_ot extends Model {
public tiempo_estimado!: number;
public id_ot!: number;
}

vista_tiempos_estimados_por_ot.init(
  {

    id_ot: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,

  },tiempo_estimado_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
  }


},
  {
    sequelize,
    modelName: 'vista_tiempos_estimados_por_ot',
    tableName: 'vista_tiempos_estimados_por_ot', // Nombre de la vista en la base de datos
    timestamps: false, // No tienes timestamps en la vista
  }
);

export default vista_tiempos_estimados_por_ot;
