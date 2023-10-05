const { Router } = require('express')
const {
   getAllSupplies,
   getSupplyById,
   createSupply,
   updateSupply,
   deleteSupply,
} = require('./supplies.controller')
const {
   getAllSupplies: getAllSuppliesValidator,
   getSupply: getSupplyValidator,
   createSupply: createSupplyValidator,
   updateSupply: updateSupplyValidator,
   deleteSupply: deleteSupplyValidator,
} = require('./supplies.validator')

const router = Router()

router.get('/', getAllSuppliesValidator, getAllSupplies)
router.get('/:id', getSupplyValidator, getSupplyById)
router.post('/', createSupplyValidator, createSupply)
router.patch('/:id', updateSupplyValidator, updateSupply)
router.delete('/:id', deleteSupplyValidator, deleteSupply)

module.exports = router
