const customExpress = require('./config/customExpress')
const connection = require('./infraestrutura/database/connection')
const tables = require('./infraestrutura/database/tables')
require('dotenv/config')

const {
    APP_URL,
    APP_PORT
} = process.env

const app = customExpress()

app.listen(APP_PORT, () => console.log(`Servidor rodando: ${APP_URL}:${APP_PORT}`))

// connection.connect(erro => {
//     if(erro) {
//         console.log(erro)
//     } else {
//         console.log('conectado ao bd')
//         let tables = new tables(connection)
//         tables.criarAtendimentos()
//         tables.criarPets()
//     }
// })