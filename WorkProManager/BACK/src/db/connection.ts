import { Sequelize } from 'sequelize';
import Cliente from '../models/cliente';
import Order from '../models/orders';
import Equipo from '../models/equipo';
import EstadoOT from '../models/estado_ot';
import Servicio from '../models/servicio';
import Usuario from '../models/usuario';


const sequelize = new Sequelize('orden_trabajo', 'root', 'pelota50', {
    host: 'localhost',
    dialect: 'mysql',
    
});





export default sequelize;

