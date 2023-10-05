const { port } = require('./config/app.config')
const dbConnection = require('./config/database.config')

process.on('uncaughtException', (err) => {
   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
   console.log(err)
   // process.exit(1)
})

const app = require('./app/app')

dbConnection.sync({ alter: true }).then(() => {
   console.log('Database connected')
   app.listen(port, () => {
      console.log(`http://127.0.0.1:${port}`)
   })
})

process.on('unhandledRejection', (err) => {
   console.log('UNHANDLED REJECTION! 💥 Shutting down...')
   console.log(err)
   // server.close(() => {
   //    process.exit(1)
   // })
})
