const fornecedor = require('../../models/fornecedores')

fornecedor.sync()
    .then(result => {
        console.log(result)
        console.log('Tabela criada com sucesso')
    })
    .catch(error => {
        console.log('Erro ao criar tabela')
        console.log(error)
    })

module.exports = fornecedor