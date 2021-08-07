const model = require('../models/produtos')
const connection = require('../infraestrutura/database/connection')

module.exports = {

    subtrair(id, idFornecedor, campo, valor) {
        return connection.transaction(async transaction => {
            try {
                const produto = await model.findOne({
                    where: {
                        id: id,
                        fornecedor: idFornecedor
                    }
                })
                produto[campo] = valor
                await produto.save()
                transaction.commit()
                return produto
            } catch(error) {
                await transaction.rollback()
            }
        })
    },
    async buscarPorId(id, fornecedor) {
        return await model.findOne({
            where: {
                id: id,
                fornecedor: fornecedor
            },
            raw: true
        })
    },
    async listar(fornecedor) {
        return await model.findAll({
            raw: true,
            where: {
                fornecedor: fornecedor
            },
            raw: true
        })
    },
    async criar(produto) {
        return await model.create(produto)
    },
    async atualizar(id, fornecedor, produto) {
        return await model.update(produto, {
            where: {
                id: id,
                fornecedor: fornecedor
            }
        })
    },
    async excluir(id, fornecedor) {
        return await model.destroy({
            where: {
                id: id,
                fornecedor: fornecedor
            }
        })
    }
}