import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';

class usuarios_rol_2_con_tiempo extends Model {
public rut_usuario!: number;
}

usuarios_rol_2_con_tiempo.init(
  {

    rut_usuario: {
        type: DataTypes.INTEGER, // El tipo de dato es un entero
        primaryKey: true, // Define que rut_usuario es la clave primaria
        autoIncrement: true // Indica que se incrementa automáticamente
    },

    d_veri_usu: {
        type: DataTypes.STRING, // Define el dígito verificador como una cadena de caracteres
        allowNull: false // Dígito verificador no puede ser nulo
    },
    nom_usu: {
        type: DataTypes.STRING, // Define el nombre del usuario como una cadena de caracteres
        allowNull: false // Nombre no puede ser nulo
    },
    ap_usu: {
        type: DataTypes.STRING, // Define el nombre del usuario como una cadena de caracteres
        allowNull: false // Nombre no puede ser nulo
    },
    email_usu: {
        type: DataTypes.STRING, // Define el correo del usuario como una cadena de caracteres
        allowNull: true // Correo es opcional
    },
    cel_usu:{
        type: DataTypes.STRING, // Define el celular del usuario como una cadena de caracteres
        allowNull: false // Celular no puede ser nulo
    },
    id_rol:{
        type: DataTypes.INTEGER, // Define el rol del usuario como un entero
        allowNull: false,
        references: {
            model: 'rol',
            key: 'id_rol'
        }
    },
    tiempo_actual:{
        type: DataTypes.DATE, // Define el rol del usuario como un entero
        allowNull: false,
},
tiempo_limite:{
    type: DataTypes.DATE, // Define el rol del usuario como un entero
    allowNull: false,
    },
    },
  {
    sequelize,
    modelName: 'usuarios_rol_2_con_tiempo',
    tableName: 'usuarios_rol_2_con_tiempo', // Nombre de la vista en la base de datos
    timestamps: false, // No tienes timestamps en la vista
  }
);

export default usuarios_rol_2_con_tiempo;
