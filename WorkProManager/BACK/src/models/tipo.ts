import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Tipo_Equipo = db.define('Tipo_Equipo', {
    id_tipo: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nom_tipo: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'tipo_equipo',
    createdAt: false,
    updatedAt: false
}); 



export default Tipo_Equipo;
