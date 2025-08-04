const { Sequelize } = require("sequelize");
const { DB_HOST,DB_PORT,DB_PASSWORD,DB_USERNAME,DB_NAME } = require('./env.config');


const db = new Sequelize({
    host:DB_HOST,
    port:DB_PORT,
    password:DB_PASSWORD,
    username:DB_USERNAME,
    database:DB_NAME,
    dialect:'mysql'
})

module.exports = { db }