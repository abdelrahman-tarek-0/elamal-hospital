const { Router } = require('express')
const {
   getAllSupplies,
   getSupply,
   createSupply,
   updateSupply,
   deleteSupply,
   changeSupplyStock,
} = require('./supplies.controller')
const {
   getAllSupplies: getAllSuppliesValidator,
   getSupply: getSupplyValidator,
   createSupply: createSupplyValidator,
   updateSupply: updateSupplyValidator,
   deleteSupply: deleteSupplyValidator,
   changeSupplyStock: changeSupplyStockValidator,
} = require('./supplies.validator')

const router = Router()

router.get('/', getAllSuppliesValidator, getAllSupplies)
router.get('/:id', getSupplyValidator, getSupply)
router.post('/', createSupplyValidator, createSupply)
router.patch('/:id', updateSupplyValidator, updateSupply)
router.patch('/:id/stock', changeSupplyStockValidator, changeSupplyStock)
router.delete('/:id', deleteSupplyValidator, deleteSupply)

module.exports = router
