const conexao = require('./conexao')

const executaQuery = (query, parametros = '') => {
    return new Promise((resolve, reject) => {
        conexao.query(query, parametros, (error, result, campos) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

module.exports = executaQuery