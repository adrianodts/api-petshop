const repository = require('../repository/fornecedores')
const NotFound = require('../errors/NotFound')
const InvalidField = require('../errors/InvalidField');
const EmptyRequest = require('../errors/EmptyRequest');

class Fornecedor {
    constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao }) {
        this.id = id;
        this.empresa = empresa;
        this.email = email;
        this.categoria = categoria; 
        this.dataCriacao = dataCriacao;
        this.dataAtualizacao = dataAtualizacao;
        this.versao = versao;
    }

    async buscarPorId() {
        const fornecedor = await repository.buscarPorId(this.id)
        if(!fornecedor) {
            throw new NotFound()
        }
        this.empresa = fornecedor.empresa;
        this.email = fornecedor.email;
        this.categoria = fornecedor.categoria; 
        this.dataCriacao = fornecedor.dataCriacao;
        this.dataAtualizacao = fornecedor.dataAtualizacao;
        this.versao = fornecedor.versao;

        return fornecedor
    }

    async criar() {
        const dados = this.validar()
        const fornecedor = await repository.inserir(dados);
        this.id = fornecedor.id
        this.empresa = fornecedor.empresa;
        this.email = fornecedor.email;
        this.categoria = fornecedor.categoria; 
        this.dataCriacao = fornecedor.dataCriacao
        this.dataAtualizacao = fornecedor.dataAtualizacao
        this.versao = fornecedor.versao
        return this
    }

    async atualizar() {
        const fornecedor = await repository.buscarPorId(this.id)
        if(!fornecedor) {
            throw new NotFound()
        }
        const dados = this.validar()
        return await repository.atualizar(this.id, dados)
    }

    async excluir() {
        const fornecedor = await repository.buscarPorId(this.id)
        if(!fornecedor) {
            throw new NotFound()
        }
        return repository.excluir(this.id)
    }

    validar() {
        const campos = ['empresa','email','categoria']
        const dadosParaAtualizar = {}
        // const error = []

        campos.forEach((campo) => {
            // obtem o valor do campo passado no construtor
            const valor = this[campo]

            // verifica se é uma string e contem informacao
            if(typeof valor !== 'string' || valor.length === 0) {
                // error.push(`O campo ${campo} está inválido`)
                throw new InvalidField(campo)
            }
            
            // verifica se o valor é do tipo string e se contem dados
            if(typeof valor === 'string' && valor.length) {
                // atribui o valor do campo aos dados que serao atualizados 
                dadosParaAtualizar[campo] = valor
            }
        })
        // verifica se existe algum dado enviado
        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new EmptyRequest()
        }
        // if (error.length > 0) {
        //     throw new Error(error)
        // }
        return dadosParaAtualizar
    }
}

module.exports = Fornecedor