const Sequelize = require('sequelize')
require('dotenv/config')

const {
    DB_DATABASE,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DIALECT
} = process.env

const connection = new Sequelize(
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    {
        host: DB_HOST,
        port: DB_PORT,
        dialect: DB_DIALECT
    }
)

module.exports = connection
