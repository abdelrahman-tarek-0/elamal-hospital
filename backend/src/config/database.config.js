const { Sequelize } = require('sequelize')
const { DB } = require('./app.config')

const connection = new Sequelize({
   dialect: 'sqlite',
   storage: DB,
   logging: false,
})

module.exports = connection
