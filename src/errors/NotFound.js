class NotFound extends Error {
    constructor() {
        super('Fornecedor não foi encontrado')
        this.name = 'NotFound'
        this.id = 999
    }
}

module.exports = NotFound