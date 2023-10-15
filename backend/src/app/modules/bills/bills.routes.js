const { Router } = require('express')


const {
    getAllBills
} = require('./bills.controller')


// const {
//     getAllBills: getAllBillsValidator
// } = require('./bills.validator')

const router = Router()

router.get('/', getAllBills)

module.exports = router