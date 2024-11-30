import { Sequelize } from 'sequelize';

// const sequelize
const sequelize = new Sequelize('workpromanager', 'root', 'pelota50', {
    host: 'localhost',
    dialect: 'mysql',

});
export default sequelize;

