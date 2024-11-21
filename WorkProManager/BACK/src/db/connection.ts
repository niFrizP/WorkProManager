import { Sequelize } from 'sequelize';
import Cliente from '../models/cliente';
import Order from '../models/orders';
import Equipo from '../models/equipo';
import EstadoOT from '../models/estado_ot';
import Servicio from '../models/servicio';
import Usuario from '../models/usuario';
import { configDotenv } from 'dotenv';


const sequelize = new Sequelize('ot_db', 'root', '7697', {
    host: 'localhost',
    dialect: 'mysql',
    
});





export default sequelize;

