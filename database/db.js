const Sequelize = require('sequelize');

const connection = new Sequelize('myDatabase', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = {
    connection,
    Sequelize
}