const Model = require('../models/fornecedores')

module.exports = {
    listar() {
        return Model.findAll({ raw: true }) // retorna o objeto puro
    },
    inserir(fornecedor) {
        return Model.create(fornecedor)
    },
    async buscarPorId(id) {
        return await Model.findOne({
            raw : true, 
            where: { 
                id: id 
            }
        })
    },
    async atualizar(id, fornecedor) {
        return await Model.update(fornecedor, {
            where: { 
                id: id 
            }
        })
    },
    async excluir(id) {
        return await Model.destroy({
            where: { 
                id: id 
            }
        })
    }
}