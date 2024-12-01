import { Sequelize } from 'sequelize';

// const sequelize
const sequelize = new Sequelize('workpromanager', 'root', '7697', {
    host: 'localhost',
    dialect: 'mysql',

});
export default sequelize;

