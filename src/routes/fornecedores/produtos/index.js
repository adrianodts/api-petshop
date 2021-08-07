const router = require('express').Router( { mergeParams: true })
const repository = require('../../../repository/produtos')
const Produto = require('../../../dto/Produto')
const ProdutoSerializer = require('../../../util/Serializer').ProdutoSerializer
const NotFound = require('../../../errors/NotFound')
const Serializer = require('../../../util/Serializer')

router.get('/', async (req, res, next) => {
    await repository.listar(req.fornecedor.id)
        .then((result) => {
            if (Array.isArray(result) && result.length) {
                const serializer = new ProdutoSerializer(
                    res.getHeader('Content-Type')
                )
                res.status(200)
                res.send(
                    serializer.serialize(result)
                )
            } else {
                throw new NotFound('Produto')
            }
        })
        .catch((error) => {
            next(error)
        })
})

router.get('/:id', async (req, res, next) => {
    try {
        const dados = {
            fornecedor: req.fornecedor.id,
            id: req.params.id
        }
        const produto = new Produto(dados)
        await produto.buscarPorId()
        const serializer = new ProdutoSerializer(
            res.getHeader('Content-Type')
        )
        res.set('ETag', produto.versao)
                const timestamp = new Date(produto.dataAtualizacao).getTime()
                res.set('Last-Modified', timestamp)
        res.status(200)
        res.send(
            serializer.serialize(produto)
        )
    } catch (error) {
        next(error)
    }
})

router.head('/:id', async (req, res, next) => {
    try {
        const dados = {
            fornecedor: req.fornecedor.id,
            id: req.params.id
        }
        const produto = new Produto(dados)
        await produto.buscarPorId()
        res.set('ETag', produto.versao)
                const timestamp = new Date(produto.dataAtualizacao).getTime()
                res.set('Last-Modified', timestamp)
        res.status(200)
        res.end()
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const idFornecedor = req.fornecedor.id
        const corpo = req.body
        const produto = new Produto(Object.assign({}, corpo, { fornecedor: idFornecedor }))
        await produto.criar()
        const serializer = new ProdutoSerializer(
            res.getHeader('Content-Type')
        )
        res.set('ETag', produto.versao)
        const timestamp = new Date(produto.dataAtualizacao).getTime()
        res.set('Last-Modified', timestamp)
        res.set('Location', `/api/fornecedores/${produto.fornecedor}/produtos/${produto.id}`)
        res.status(201)
        res.send(
            serializer.serialize(produto)
        )
    }catch(error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const ids = {
            id: req.params.id,
            fornecedor: req.fornecedor.id
        }
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, ids)
        const produto = new Produto(dados)
        await produto.atualizar()
        await produto.buscarPorId()
        res.set('ETag', produto.versao)
        const timestamp = new Date(produto.dataAtualizacao).getTime()
        res.set('Last-Modified', timestamp)
        res.status(204)
        res.end()
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    const dados = {
        fornecedor: req.fornecedor.id,
        id: req.params.id
    }
    const produto = new Produto(dados)
    await produto.excluir()
        .then((result) => {
            res.status(204).end()
        })
        .catch((error) => {
            next(error)
        })
})

module.exports = router