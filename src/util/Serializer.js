const SerializationNotSupported = require('../errors/SerializationNotSupported')
const json2xml = require('json2xml');
// const jsonxml = require('jsontoxml');
class Serializer {

    json(dados) {
        return JSON.stringify(dados)
    } 
    
    xml(dados) {
        this.tag = this.tagSingular

        if(Array.isArray(dados)) {
            this.tag = this.tagPlural
            dados = dados.map(dado => {
                return {
                    [this.tagSingular]: dado
                }
            })
        }
        return json2xml({ [this.tag]: dados })
    }

    serialize(dados) {
        const filteredColumns = this.filter(dados)
        if (this.contentType === 'application/json') {
            return this.json(filteredColumns)
        }
        if (this.contentType === 'application/xml') {
            return this.xml(filteredColumns)
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
    constructor(contentType, extraFields) {
        super()
        this.contentType = contentType
        this.publicFields = [
            'id', 
            'empresa', 
            'categoria'
        ].concat(extraFields || [])
        this.tagSingular = 'fornecedor'
        this.tagPlural = 'fornecedores'
    }
}

class ProdutoSerializer extends Serializer {
    constructor(contentType, extraFields) {
        super()
        this.contentType = contentType
        this.publicFields = [
            'id', 
            'titulo',
            'preco',
            // 'estoque',
            // 'fornecedor'
        ].concat(extraFields || [])
        this.tagSingular = 'produto'
        this.tagPlural = 'produtos'
    }
}
class ErrorSerializer extends Serializer {
    constructor(contentType, extraFields) {
        super(contentType)
        this.contentType = contentType
        this.publicFields = [
            'id', 
            'mensagem'
        ].concat(extraFields || [])
        this.tagSingular = 'erro'
        this.tagPlural = 'errors'
    }
}

module.exports = {
    Serializer: Serializer,
    FornecedorSerializer: FornecedorSerializer,
    ProdutoSerializer: ProdutoSerializer,
    ErrorSerializer: ErrorSerializer,
    supportedFormats: [
        'application/json',
        'application/xml'
    ] 
}