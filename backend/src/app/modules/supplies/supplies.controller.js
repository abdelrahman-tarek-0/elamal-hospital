const Supply = require('./supplies.model')

const resBuilder = require('../../utils/response.builder')
const ErrorBuilder = require('../../utils/error.builder')
const catchAsync = require('../../utils/catch-async')

exports.getAllSupplies = catchAsync(async (_req, res) => {
   const supplies = await Supply.getAllSupplies()

   resBuilder(res, 200, 'تم استدعاء المسلتزمات', supplies)
})

exports.getSupplyById = catchAsync(async (req, res) => {
   const supply = await Supply.getSupplyById(req.params.id)

   if (!supply)
      throw new ErrorBuilder({
         message: `المورد رقم ${req.params.id} غير موجود`,
         statusCode: 404,
         code: 'RESOURCES_NOT_FOUND',
      })

   resBuilder(res, 200, 'تم استدعاء المستلزم', supply)
})

exports.createSupply = catchAsync(async (req, res) => {
   const supply = await Supply.createSupply(req.body)

   resBuilder(res, 201, 'تم تخزين المستلزم', supply)
})

exports.updateSupply = catchAsync(async (req, res) => {
   const supply = await Supply.updateSupply(req.params.id, req.body)

   if (!supply)
      throw new ErrorBuilder({
         message: `المورد رقم ${req.params.id} غير موجود`,
         statusCode: 404,
         code: 'RESOURCES_NOT_FOUND',
      })

   resBuilder(res, 200, 'تم تعديل المستلزم', supply)
})

exports.deleteSupply = catchAsync(async (req, res) => {
   const supply = await Supply.deleteSupply(req.params.id)

   if (!supply)
      throw new ErrorBuilder({
         message: `المورد رقم ${req.params.id} غير موجود`,
         statusCode: 404,
         code: 'RESOURCES_NOT_FOUND',
      })

   resBuilder(res, 200, 'تم حذف المستلزم', supply)
})
