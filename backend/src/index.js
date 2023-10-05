const { port } = require('./config/app.config')

process.on('uncaughtException', (err) => {
   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
   console.log(err)
   // process.exit(1)
})

const app = require('./app/app')

app.listen(port, () => {
   console.log(`http://127.0.0.1:${port}`)
})

process.on('unhandledRejection', (err) => {
   console.log('UNHANDLED REJECTION! 💥 Shutting down...')
   console.log(err)
   // server.close(() => {
   //    process.exit(1)
   // })
})