import { DataTypes, Model } from 'sequelize';
import db from '../db/connection'; // Asegúrate de que esta ruta sea correcta

class Cliente extends Model {}

Cliente.init({
    rut_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    d_veri_cli: {
        type: DataTypes.STRING
    },
    nom_cli: {
        type: DataTypes.STRING
    },
    ap_cli: {
        type: DataTypes.STRING
    },
    email_cli: {
        type: DataTypes.STRING
    },
    cel_cli: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize: db, // Asegúrate de que 'db' esté definido correctamente
    modelName: 'cliente',
    tableName: 'cliente', // Especifica el nombre exacto de la tabla
    createdAt: false,
    updatedAt: false
});

Cliente.hasMany(Cliente, { foreignKey: 'rut_cliente' });

export default Cliente;
