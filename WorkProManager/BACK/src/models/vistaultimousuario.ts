import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';

class VistaUltimaAdjudicacion extends Model {
  public id_adjudicacion!: number;
  public rut_usuario!: string;
  public id_ot!: number;
  public fecha_adjudicacion!: Date;
  public nom_usu!: string;
  public ap_usu!: string;
  // Otros campos de tu vista si es necesario
}

VistaUltimaAdjudicacion.init(
  {
    id_adjudicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    rut_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_ot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_adjudicacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nom_usu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ap_usu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Otros campos según tu vista
  },
  {
    sequelize,
    modelName: 'VistaUltimaAdjudicacion',
    tableName: 'vista_ultima_adjudicacion', // Nombre de la vista en la base de datos
    timestamps: false, // No tienes timestamps en la vista
  }
);

export default VistaUltimaAdjudicacion;
