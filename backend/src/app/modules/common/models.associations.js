const { DataTypes, Model } = require('sequelize')
const connection = require('../../../config/database.config')

const Supply = require('../supplies/supplies.model')
const Session = require('../sessions/sessions.model')

class SessionSupply extends Model {}

SessionSupply.init(
   {
      SupplyId: {
         type: DataTypes.INTEGER,
         references: {
            model: Supply,
            key: 'id',
         },
      },
      SessionId: {
         type: DataTypes.INTEGER,
         references: {
            model: Session,
            key: 'id',
         },
      },
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

// const SessionSupply = connection.define('SessionSupply', {
//    SupplyId: {
//       type: DataTypes.INTEGER,
//       references: {
//          model: Supply,
//          key: 'id',
//       },
//    },
//    SessionId: {
//       type: DataTypes.INTEGER,
//       references: {
//          model: Session,
//          key: 'id',
//       },
//    },
//    quantity: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       defaultValue: 0,
//    },
// })

const syncAssociations = () => {
   Supply.belongsToMany(Session, { through: SessionSupply })
   Session.belongsToMany(Supply, { through: SessionSupply })
}

module.exports = {
   syncAssociations,
   SessionSupply,
}
