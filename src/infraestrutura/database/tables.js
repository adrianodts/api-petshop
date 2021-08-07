const models = [
    require('../../models/fornecedores'),
    require('../../models/produtos')
]

async function criarTabelas() {
    await models.forEach((model) => {
        model.sync()
            .then((result) => {
                console.log(`Tabela ${result.name} criada com sucesso`)
            })
            .catch(error => {
                console.log(error)
            })
    })
}

criarTabelas()

