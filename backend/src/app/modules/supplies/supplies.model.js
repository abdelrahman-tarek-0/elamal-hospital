const { DataTypes, Model } = require('sequelize')
const connection = require('../../../config/database.config')

class Supply extends Model {
   static async getAllSupplies() {
      return await Supply.findAll({
         include: ['Sessions'],
      })
   }

   static async getSupplyById(id) {
      return await Supply.findByPk(id,{
         include: ['Sessions'],
      })
   }

   static async createSupply(supply) {
      return await Supply.create(supply)
   }

   static async updateManySupplies(supplies) {
      return await Promise.all(
         supplies.map(async (supply) => {
            await Supply.update(supply, {
               where: {
                  id: supply.id,
               },
            })
            return await Supply.findByPk(supply.id)
         })
      )
   }

   static async updateSupply(id, supply) {
      await Supply.update(supply, {
         where: {
            id,
         },
      })
      return await Supply.findByPk(id)
   }

   static async deleteSupply(id) {
      return await Supply.destroy({
         where: {
            id,
         },
      })
   }
}

Supply.init(
   {
      // medical supply

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

      buyingPrice: {
         type: DataTypes.DECIMAL(10, 2),
         allowNull: false,
         defaultValue: 0.0,
      },

      sellingPrice: {
         type: DataTypes.DECIMAL(10, 2),
         allowNull: false,
         defaultValue: 0.0,
      },

      stock: {
         type: DataTypes.INTEGER,
         allowNull: false,
         defaultValue: 0,
      },
   },
   {
      sequelize: connection,
      modelName: 'Supply',
   }
)

module.exports = Supply
