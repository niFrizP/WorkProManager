import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Equipo = db.define('Equipo', {
    
    num_equipo: {
        type: DataTypes.INTEGER,// Puede ser STRING si el número de equipo tiene caracteres especiales
        primaryKey: true, // Define que id_equipo es la clave primaria

    },
    tipo_equipo: {
        type: DataTypes.STRING
    },
    mod_equipo: {
        type: DataTypes.STRING
    },
    id_marca: {
        type: DataTypes.INTEGER
    },
    fec_fabric: {
        type: DataTypes.DATE // Para la fecha de fabricación
    }
}, {
    tableName: 'equipo', // Especifica el nombre exacto de la tabla
    createdAt: false,
    updatedAt: false
});

export default Equipo;
