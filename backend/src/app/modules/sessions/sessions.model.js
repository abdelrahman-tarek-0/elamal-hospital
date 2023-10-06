const { DataTypes, Model } = require('sequelize')
const connection = require('../../../config/database.config')

class Session extends Model {
   static async getAllSessions() {
      return await Session.findAll({
         include: ['Supplies'],
      })
   }

   static async getSessionById(id) {
      return await Session.findByPk(id, {
         include: ['Supplies'],
      })
   }

   static async createSession(session) {
      return await Session.create(session)
   }

   static async updateSession(id, session) {
      await Session.update(session, {
         where: {
            id,
         },
      })
      return await Session.findByPk(id,{
         include: ['Supplies'],
      })
   }

   static async deleteSession(id) {
      return await Session.destroy({ where: { id } })
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

   },
   {
      sequelize: connection,
      modelName: 'Session',
   }
)

module.exports = Session
