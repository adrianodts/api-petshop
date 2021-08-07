class EmptyRequest extends Error {
    constructor(assunto) {
        super(`Não foram enviados dados para salvar/atualizar ${assunto}!`)
        this.name = 'EmptyRequest'
        this.id = 997
    }
}

module.exports = EmptyRequest