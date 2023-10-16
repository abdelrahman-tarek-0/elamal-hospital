const { port } = require('./config/app.config')
const dbConnection = require('./config/database.config')
const { syncAssociations } = require('./app/modules/_common/models.associations')

const open = require('open');

process.on('uncaughtException', (err) => {
   console.log('UNCAUGHT EXCEPTION! 💥')
   // process.exit(1)
})

const app = require('./app/app')

syncAssociations()

dbConnection.sync({
   //force: true,
}).then(() => {
   console.log('Database connected')
   app.listen(port, () => {
      console.log(`http://127.0.0.1:${port}`)
      // open(`http://127.0.0.1:${port}`)
   })
   
})

process.on('unhandledRejection', (err) => {
   console.log('UNHANDLED REJECTION! 💥')
   // server.close(() => {
   //    process.exit(1)
   // })
})
