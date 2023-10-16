const Bill = require('./bills.model')
const Supply = require('../supplies/supplies.model')

const resBuilder = require('../../utils/response.builder')
const ErrorBuilder = require('../../utils/error.builder')
const catchAsync = require('../../utils/catch-async')

exports.getAllBills = catchAsync(async (_req, res) => {
   const bills = await Bill.getAllBills()

   resBuilder(res, 200, 'تم استدعاء الفواتير', bills)
})
