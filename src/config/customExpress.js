const express = require('express')
// const consign = require('consign')
const fornecedores = require('../routes/fornecedores')
const NotFound = require('../errors/NotFound')
const InvalidField = require('../errors/InvalidField')
const EmptyRequest = require('../errors/EmptyRequest')
const SerializationNotSupported = require('../errors/SerializationNotSupported')
const supportedFormats = require('../util/Serializer').supportedFormats
const ErrorSerializer = require('../util/Serializer').ErrorSerializer
const Fornecedor = require('../dto/Fornecedor')

const app = express()

module.exports = () => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use((req, res, next) => {
        res.set('X-Powered-By', 'Gatito Petshop')
        res.set('Access-Control-Allow-Origin', '*')
        res.set('Access-Control-Allow-Headers', 'Content-Type')    
        next()
    })

    app.use((req, res, next) => {
        let contentType = req.header('Accept')

        if (contentType === '*/*') {
            contentType = 'application/json'
        }

        if(supportedFormats.indexOf(contentType) === -1) {
            res.status(406)
            res.end()
            return;
        }

        res.setHeader('Content-Type', contentType)
        next()
    })

    // consign()
    //   .include('./src/routes')
    //   .into(app)

    app.use('/api/fornecedores', fornecedores)

    app.use((error, req, res, next) => {
        let statusCode = 500
        if(error instanceof NotFound) {
            statusCode = 404
        }
        
        if(error instanceof InvalidField || error instanceof EmptyRequest) {
            statusCode = 400
        }

        if(error instanceof SerializationNotSupported) {
            statusCode = 406
        }

        //res.status(statusCode)
        // const json = JSON.stringify({
        //     id: error.id,
        //     mensagem: error.message,
        // })
        // res.send(json)
        
        // res.status(statusCode).json({
        //     id: error.id,
        //     mensagem: error.message,
        // })

        const serializer = new ErrorSerializer(
            res.getHeader('Content-Type')
        )
        res.status(statusCode)
        res.send(serializer.serialize({ 
            id: error.id, 
            mensagem: error.message 
        }))
    })

    return app
}