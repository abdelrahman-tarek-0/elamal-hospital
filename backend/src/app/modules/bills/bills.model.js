const { DataTypes, Model } = require('sequelize')
const connection = require('../../../config/database.config')

class BillDetail extends Model {}

class Bill extends Model {
   static async getAllBills() {
      return await Bill.findAll({
         include: ['billDetails'],
         order: [['id', 'DESC']],
        
      })
   }

   static async createBill(type, supplies) {
      const bill = await Bill.create({ type })

      if (supplies && supplies.length) {
         await BillDetail.bulkCreate(
            supplies?.map((supply) => ({
               BillId: bill.id,
               supplyId: supply.id,
               supplyName: supply.supplyName,
               supplyBuyingPrice: supply.supplyBuyingPrice,
               supplySellingPrice: supply.supplySellingPrice,
               quantity: supply.quantity,
            })) || []
         )
      }

      return await Bill.findByPk(bill.id, {
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
         type: DataTypes.ENUM('bill', 'restock'),
         allowNull: false,
      },
   },
   {
      sequelize: connection,
      modelName: 'Bill',
   }
)

BillDetail.init(
   {
      supplyName: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      supplyId: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      supplyBuyingPrice: {
         type: DataTypes.FLOAT,
         allowNull: false,
      },
      supplySellingPrice: {
         type: DataTypes.FLOAT,
         allowNull: false,
      },
      quantity: {
         type: DataTypes.INTEGER,
         allowNull: false,
         defaultValue: 0,
      },
   },
   {
      sequelize: connection,
      modelName: 'BillDetail',
   }
)

Bill.hasMany(BillDetail, {
   foreignKey: 'BillId',
   as: 'billDetails',
   onDelete: 'CASCADE',
   onUpdate: 'CASCADE',
})

BillDetail.belongsTo(Bill, {
   foreignKey: 'BillId',
   as: 'bill',
   onDelete: 'CASCADE',
   onUpdate: 'CASCADE',
})

module.exports = Bill
