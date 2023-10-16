const { port } = require('./config/app.config')
const dbConnection = require('./config/database.config')
const {
   syncAssociations,
} = require('./app/modules/_common/models.associations')

const open = require('open')

process.on('uncaughtException', (err) => {
   console.log('UNCAUGHT EXCEPTION! 💥')
})

const app = require('./app/app')

syncAssociations()

dbConnection
   .sync({
      //force: true,
   })
   .then(() => {
      app.listen(port, () => {
         console.log(`\n\n\t\t\x1b[36mhttp://127.0.0.1:${port}\x1b[0m`)
         open(`http://127.0.0.1:${port}`)
      })
   })

process.on('unhandledRejection', (err) => {
   console.log('UNHANDLED REJECTION! 💥')
})
