const repositoryProduto = require('../repository/produtos')
const NotFound = require('../errors/NotFound')
const InvalidField = require('../errors/InvalidField');
const EmptyRequest = require('../errors/EmptyRequest');

class Produto {
    constructor({ id, titulo, preco, fornecedor, estoque, dataCriacao, dataAtualizacao, versao }) {
        this.id = id
        this.titulo = titulo
        this.preco = preco
        this.estoque = estoque
        this.fornecedor = fornecedor
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async buscarPorId() {
        const produto = await repositoryProduto.buscarPorId(this.id, this.fornecedor)
        if(!produto) {
            throw new NotFound('Produto')
        }
        this.titulo = produto.titulo
        this.preco = produto.preco
        this.estoque = produto.estoque
        this.fornecedor = produto.fornecedor
        this.dataCriacao = produto.dataCriacao
        this.dataAtualizacao = produto.dataAtualizacao
        this.versao = produto.versao
        return produto
    }

    async criar() {
        this.validar()
        const produto = await repositoryProduto.criar({
            id: this.id,
            titulo: this.titulo,
            preco: this.preco,
            estoque: this.estoque,
            fornecedor: this.fornecedor
        });
        this.dataCriacao = produto.dataCriacao
        this.dataAtualizacao = produto.dataAtualizacao
        this.versao = produto.versao
        return this
    }

    async atualizar() {
        const produto = await repositoryProduto.buscarPorId(this.id, this.fornecedor)
        if(!produto) {
            throw new NotFound('Produto')
        }
        const dadosParaAtualizar = {}
        if (this.titulo !== undefined && (typeof this.titulo === 'string' || this.titulo.length > 0)) {
            dadosParaAtualizar.titulo = this.titulo
        }
        if (this.preco !== undefined && typeof this.preco === 'number' || this.preco > 0) {
            dadosParaAtualizar.preco = this.preco
        }
        if (this.estoque !== undefined && typeof this.estoque === 'number') {
            dadosParaAtualizar.estoque = this.estoque
        }
        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new EmptyRequest('produto')
        }
        return await repositoryProduto.atualizar(this.id, this.fornecedor, dadosParaAtualizar)
    }

    async excluir() {
        const produto = await repositoryProduto.buscarPorId(this.id, this.fornecedor)
        if(!produto) {
            throw new NotFound('Produto')
        }
        return repositoryProduto.excluir(this.id, this.fornecedor)
    }

    validar() {
        if (typeof this.titulo !== 'string' || this.titulo.length === 0) {
            throw new Error('O campo titulo está inválido')
        }
        if (typeof this.preco !== 'number' || this.preco === 0) {
            throw new Error('O campo preco está inválido')
        }
    }
}

module.exports = Produto