const _path = require('path')

const express = require('express')
const cors = require('cors')

const api = require('./routes/index.routes')

const app = express()

app.use((_req, res, next) => {
   res.header('Access-Control-Allow-Credentials', true)
   next()
})
app.use(cors())

app.use(express.json({ limit: '100kb' }))
app.use(express.urlencoded({ extended: true, limit: '100kb' }))

// get statics files (index.html ,img,icons,etc)
app.use(express.static(_path.join(__dirname, '..', 'public')))
// app.get('/static/logo', (_req, res) => {
//    res.sendFile(_path.join(__dirname, '..', 'public', 'logo.jpg'))
// })

// serve the api routes
app.use('/api/v1', api)

// serve the react router/SPA
app.get('*', (_req, res, next) => {
    res.sendFile(_path.join(__dirname, '..', 'public', 'index.html'))
})

app.use((err, _req, res, _next) => {
   res.status(err.statusCode || 500).json({
      status: 'error',
      message: err.message,
      stack: err.stack.split('\n').map((line) => line.trim()),
      errObj: err,
   })
})
app.use((req, res) => {
   res.status(404).json({
      status: 'fail',
      message: `Can't find ${req.originalUrl} on this server!`,
   })
})

module.exports = app
