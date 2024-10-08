import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Equipo = db.define('Equipo', {
    
    num_equipo: {
        primaryKey: true, // Define que id_equipo es la clave primaria
        autoIncrement: true, // Si es autoincremental, añade esto
        type: DataTypes.INTEGER // Puede ser STRING si el número de equipo tiene caracteres especiales
    },
    tipo_equipo: {
        type: DataTypes.STRING
    },
    mod_equipo: {
        type: DataTypes.STRING
    },
    marca: {
        type: DataTypes.STRING
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
