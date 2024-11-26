import { Sequelize } from 'sequelize';

// const sequelize
const sequelize = new Sequelize('ot_db', 'root', 'Mugiwara1$', {
    host: 'localhost',
    dialect: 'mysql',

});
export default sequelize;

