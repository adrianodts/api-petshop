class SerializationNotSupported extends Error {
    constructor(contentType) {
        super(`Tipo de conteúdo ${contentType} não é suportado`)
        this.name = 'SerializationNotSupported'
        this.id = 996
    }
}

module.exports = SerializationNotSupported