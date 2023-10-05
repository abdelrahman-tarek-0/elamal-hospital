const { DataTypes, Model } = require('sequelize')
const connection = require('../../../config/database.config')

class Supply extends Model {
   static async getAllSupplies() {
      return await Supply.findAll()
   }

   static async getSupplyById(id) {
      return await Supply.findByPk(id)
   }

   static async createSupply(supply) {
      return await Supply.create(supply)
   }

   static async updateSupply(id, supply) {
      return await Supply.update(supply, {
         where: {
            id,
         },
      })
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
         allowNull: false,
      },

      description: {
         type: DataTypes.STRING(4095),
         allowNull: true,
         defaultValue: '',
      },

      price: {
         type: DataTypes.DECIMAL(10, 2),
         allowNull: false,
         defaultValue: 0.0,
      },

      stock: {
         type: DataTypes.INTEGER,
         allowNull: false,
         defaultValue: 0,
      },

      image: {
         type: DataTypes.STRING(255),
         allowNull: true,
         defaultValue: '',
      },
   },
   {
      sequelize: connection,
      modelName: 'Supply',
   }
)

module.exports = Supply
