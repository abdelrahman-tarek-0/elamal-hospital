const { DataTypes, Model } = require('sequelize')
const connection = require('../../../config/database.config')

const Supply = require('../supplies/supplies.model')
const Session = require('../sessions/sessions.model')

class SessionSupply extends Model {
   static async addSuppliesToSession(session, supplies) {
      await SessionSupply.bulkCreate(
         supplies?.map(supply => ({
            SessionId: session.id,
            SupplyId: supply.id,
            quantity: supply.quantity,
         })) || []
      )
      let newSession = await Session.getSessionById(session.id, {
         include: [Supply],
      })

      return newSession
   }

   static async updateSuppliesOfSession(session, supplies) {
      await SessionSupply.destroy({
         where: {
            SessionId: session.id,
         },
      })

      await SessionSupply.bulkCreate(
         supplies?.map(supply => ({
            SessionId: session.id,
            SupplyId: supply.id,
            quantity: supply.quantity,
         })) || []
      )

      let newSession = await Session.getSessionById(session.id, {
         include: [Supply],
      })

      return newSession
   }
}

SessionSupply.init(
   {
      quantity: {
         type: DataTypes.INTEGER,
         allowNull: false,
         defaultValue: 0,
      },
   },
   {
      sequelize: connection,
      modelName: 'SessionSupply',
   }
)

const syncAssociations = () => {
   Supply.belongsToMany(Session, { through: SessionSupply })
   Session.belongsToMany(Supply, { through: SessionSupply })
}

module.exports = {
   syncAssociations,
   SessionSupply,
}
