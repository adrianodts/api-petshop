const { CHAR } = require('sequelize')
const Sequelize = require('sequelize')
const connection = require('../infraestrutura/database/connection')

const columns = {
    empresa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.ENUM('racao', 'brinquedos'),
        allowNull: false
    }
}

const options = {
    freezeTableName: true,
    tableName: 'fornecedores',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}
module.exports = connection.define('fornecedor', columns, options)