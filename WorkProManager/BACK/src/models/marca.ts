import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Marca = db.define('Marca', {
    id_marca: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    nom_marca: {
        type: DataTypes.STRING(45),
        allowNull: true,
    }
}, {
    tableName: 'marca',
    timestamps: false,
});

export default Marca;