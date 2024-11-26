import { DataTypes } from 'sequelize';
import db from '../db/connection';
import vista_count_marca from './vista_count_marca';

const Marca = db.define('Marca', {
    id_marca: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Define que id_marca es la clave primaria
        autoIncrement: true // Se puede agregar esto si es autoincremental
    },
    nom_marca: {
        type: DataTypes.STRING,
        allowNull: false // Asegura que no sea nulo
    }
}, {
    tableName: 'marca', // Especifica el nombre exacto de la tabla
    createdAt: false,
    updatedAt: false
});

Marca.belongsTo(vista_count_marca, { foreignKey: 'id_marca', targetKey: 'id_marca' });


export default Marca;
