const { DataTypes, Model } = require('sequelize')
const connection = require('../../../config/database.config')

const Supply = require('../supplies/supplies.model')
const Session = require('../sessions/sessions.model')
const Bill = require('../bills/bills.model')

class SessionSupply extends Model {
   static async addSuppliesToSession(session, supplies) {
      await SessionSupply.bulkCreate(
         supplies?.map((supply) => ({
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
         supplies?.map((supply) => ({
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

class BillDetail extends Model {
   static async addSuppliesToBill(bill, supplies) {

      await BillDetail.bulkCreate(
         supplies?.map((supply) => ({
            BillId: bill.id,
            supplyName: supply.name,
            supplyBuyingPrice: supply.buyingPrice,
            supplySellingPrice: supply.sellingPrice,
            supplyId: supply.id,
            quantity: supply.quantity,
         })) || []
      )

      let newBill = await Bill.findByPk(bill.id, {
         include: [BillDetail],
      })

      return newBill
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

BillDetail.init(
   {
      supplyName: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      supplyBuyingPrice: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      supplySellingPrice: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      supplyId: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      quantity: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
   },
   {
      sequelize: connection,
      modelName: 'BillDetail',
   }
)

const syncAssociations = () => {
   Supply.belongsToMany(Session, { through: SessionSupply })
   Session.belongsToMany(Supply, { through: SessionSupply })
   BillDetail.belongsTo(Bill)
   Bill.hasMany(BillDetail)
}

module.exports = {
   syncAssociations,
   SessionSupply,
   BillDetail,
}
