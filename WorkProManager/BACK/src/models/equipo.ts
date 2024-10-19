import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Order from './orders';

const Equipo = db.define('Equipo', {
    
    num_equipo: {
        type: DataTypes.INTEGER,// Puede ser STRING si el número de equipo tiene caracteres especiales
        primaryKey: true, // Define que id_equipo es la clave primaria

    },
    fec_fabric: {
        type: DataTypes.DATE
    },
    mod_equipo: {
        type: DataTypes.STRING
    },
    id_marca: {
        type: DataTypes.INTEGER,
        references: {
            model: 'marca',
            key: 'nom_marca'
        }
    },
    id_tipo: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tipo_equipo',
            key: 'id_tipo'
        }
    }

  
}, {
    tableName: 'equipo', // Especifica el nombre exacto de la tabla
    createdAt: false,
    updatedAt: false
});

Equipo.hasMany(Equipo, { foreignKey: 'num_equipo' });


export default Equipo;
