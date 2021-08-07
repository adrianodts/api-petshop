class NotFound extends Error {
    constructor(nome) {
        super(`${nome} não foi encontrado`)
        this.name = 'NotFound'
        this.id = 996
    }
}

module.exports = NotFound