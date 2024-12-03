import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Marca from './marca'; // Asegúrate de que tengas el modelo Marca definido
import OrdenTrabajo from './orden_trabajo';

class Equipo extends Model {
  public id_equipo!: number;
  public num_ser!: string | null;
  public tip_equ!: string | null;
  public mod_equ!: string | null;
  public id_marca!: number | null;
}

Equipo.init(
  {
    id_equipo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    num_ser: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    tip_equ: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    mod_equ: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    id_marca: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'marca', // Relación con la tabla Marca
        key: 'id_marca',
      },
    },
  },
  {
    sequelize: db,
    modelName: 'Equipo',
    tableName: 'equipo',
    timestamps: false,
  }
);

// Relación con la tabla `marca`
Equipo.belongsTo(Marca, {
  foreignKey: 'id_marca',
  as: 'marca',
});



export default Equipo;
