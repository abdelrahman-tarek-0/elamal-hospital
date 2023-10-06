const { DataTypes, Model } = require('sequelize')
const connection = require('../../../config/database.config')

class Session extends Model {
   static getAllSessions() {
      return Session.findAll()
   }

   static getSessionById(id) {
      return Session.findByPk(id)
   }

   static createSession(session) {
      return Session.create(session)
   }

   static updateSession(id, session) {
      return Session.update(session, { where: { id } })
   }

   static deleteSession(id) {
      return Session.destroy({ where: { id } })
   }
}

Session.init(
   // medical session
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },

      name: {
         type: DataTypes.STRING(255),
         unique: true,
         allowNull: false,
      },

      description: {
         type: DataTypes.STRING(4095),
         allowNull: true,
         defaultValue: '',
      },
   },
   {
      sequelize: connection,
      modelName: 'Session',
   }
)

module.exports = Session
