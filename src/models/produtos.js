const Sequelize = require('sequelize')
const connection = require('../infraestrutura/database/connection')

const columns = {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false    
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    estoque: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    fornecedor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('../models/fornecedores'),
            key: 'id'
        }
    }
}
const options = {
    freezeTableName: true,
    tableName: 'produtos',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = connection.define('produto', columns, options)