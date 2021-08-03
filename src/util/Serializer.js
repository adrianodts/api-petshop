const SerializationNotSupported = require('../errors/SerializationNotSupported')

class Serializer {

    json(dados) {
        return JSON.stringify(dados)
    }

    serialize(dados) {
        // console.log(`dados ${dados}`)
        if (this.contentType === 'application/json') {
            const filteredColumns = this.filter(dados)
            console.log(`Columns: ${filteredColumns}`)
            return this.json(filteredColumns)
        }
        throw new SerializationNotSupported(this.contentType)
    } 
    
    filter(dados) {
        if (Array.isArray(dados)) {
            dados = dados.map(dado => {
                return this.filterObject(dado)
            })
        } else {
            console.log(`dados ${dados}`)
            dados = this.filterObject(dados)
        }
        return dados
    }

    filterObject(dados) {
        const newObject = {}
        this.publicFields.forEach((campo) => {
            // console.log(`dados.hasOwnProperty(campo): ${dados.hasOwnProperty(campo)}`)
            if(dados.hasOwnProperty(campo)) {
                console.log(`campo: ${campo}`)
                newObject[campo] = dados[campo]
            }
        })
        return newObject
    }

}

class FornecedorSerializer extends Serializer {
    constructor(contentType) {
        super()
        this.contentType = contentType
        this.publicFields = [
            'id', 
            'empresa', 
            'categoria'
        ]
    }
}

module.exports = {
    Serializer: Serializer,
    FornecedorSerializer: FornecedorSerializer,
    supportedFormats: [
        'application/json'
    ] 
}