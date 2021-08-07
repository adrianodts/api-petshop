const router = require('express').Router()
const repository = require('../../repository/fornecedores')
const FornecedorSerializer = require('../../util/Serializer').FornecedorSerializer

router.options('/',  (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204)
    res.end()
})

router.get('/', async (req, res) => {
    const fornecedores = await repository.listar()
    res.status(200)
    const serializer = new FornecedorSerializer(
        res.getHeader('Content-Type')
    )
    res.send(
        serializer.serialize(fornecedores)
    )
})

module.exports = router