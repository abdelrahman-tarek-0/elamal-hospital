const { DataTypes, Model } = require('sequelize')
const connection = require('../../../config/database.config')

class Bill extends Model {
    static async getAllBills() {
        return await Bill.findAll({
            include: ['billDetails'],
        })
    }
}

Bill.init(
   // medical session
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },


      type: {
         type: DataTypes.ENUM('bill','resupply'),
         allowNull: false,
      },
   },
   {
      sequelize: connection,
      modelName: 'Session',
   }
)

module.exports = Bill
