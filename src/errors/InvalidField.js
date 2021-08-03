class InvalidField extends Error {
    constructor(field) {
        super(`O campo ${field} está inválido`)
        this.name = 'InvalidField'
        this.id = 998
    }
}

module.exports = InvalidField