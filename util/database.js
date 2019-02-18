const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-postgres', 'postgres', 'test1234', {
  dialect: 'postgres',
  host: 'localhost',
});

module.exports = sequelize;
