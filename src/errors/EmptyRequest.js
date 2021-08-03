class EmptyRequest extends Error {
    constructor() {
        super('Não foram enviados dados para salvar/atualizar fornecedor!')
        this.name = 'EmptyRequest'
        this.id = 997
    }
}

module.exports = EmptyRequest