const router = require('express').Router()
const repository = require('../../repository/fornecedores')
const Fornecedor = require('../../dto/Fornecedor')
const FornecedorSerializer = require('../../util/Serializer').FornecedorSerializer

router.get('/', async (req, res) => {
    const fornecedores = await repository.listar()
    res.status(200)
    //res.json(fornecedores)
    const serializer = new FornecedorSerializer(
        res.getHeader('Content-Type')
    )
    res.send(
        serializer.serialize(fornecedores)
    )
})
    
router.post('/', async (req, res, next) => {
    const fornecedor = new Fornecedor(req.body)
    await fornecedor.criar()
        // .then(result => res.status(201).json(result))
        .then(result => {
            const serializer = new FornecedorSerializer(
                res.getHeader('Content-Type')
            )
            res.status(201)
            res.send(
                serializer.serialize(result)
            )
        })
        .catch((error) => {
            next(error)
        })
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    const fornecedor = new Fornecedor({ id: id })
    await fornecedor.buscarPorId()
        // .then(result => {
        //     res.status(200).json(fornecedor)
        // })
        .then(result => {
            const serializer = new FornecedorSerializer(
                res.getHeader('Content-Type')
            )
            res.status(200)
            res.send(
                serializer.serialize(result)
            )
        })
        .catch((error) => {
            next(error)
        })

})

router.put('/:id', async (req, res, next) => {
    const id = req.params.id
    const dadosRecebidos = req.body
    //const fornecedor = new Fornecedor({ id, ...dados })
    const dados = Object.assign({}, dadosRecebidos, { id: id })
    const fornecedor = new Fornecedor(dados)
    await fornecedor.atualizar()
        .then(() => {
            res.status(204)
            res.end()
        })
        .catch((error) => {
            next(error)
        })

})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    const fornecedor = new Fornecedor({id: id})
    await fornecedor.excluir()
        .then((result) => {
            res.status(204).end()
        })
        .catch((error) => {
            next(error)
        })

})

module.exports = router