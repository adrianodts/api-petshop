class NotFound extends Error {
    constructor(assunto) {
        super(`${assunto} não foi encontrado`)
        this.name = 'NotFound'
        this.id = 996
    }
}

module.exports = NotFound