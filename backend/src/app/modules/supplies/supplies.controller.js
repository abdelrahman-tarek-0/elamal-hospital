const Supply = require('./supplies.model')
const Bill = require('../bills/bills.model')

const resBuilder = require('../../utils/response.builder')
const ErrorBuilder = require('../../utils/error.builder')
const catchAsync = require('../../utils/catch-async')

exports.getAllSupplies = catchAsync(async (_req, res) => {
   const supplies = await Supply.getAllSupplies()

   resBuilder(res, 200, 'تم استدعاء المسلتزمات', supplies)
})

exports.getSupply = catchAsync(async (req, res) => {
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

exports.changeSupplyStock = catchAsync(async (req, res) => {
   const supply = await Supply.getSupplyById(req.params.id)
   const change = req?.body?.change || 0

   if (!supply)
      throw new ErrorBuilder({
         message: `المورد رقم ${req.params.id} غير موجود`,
         statusCode: 404,
         code: 'RESOURCES_NOT_FOUND',
      })

   if (change === 0) return resBuilder(res, 200, 'تم تعديل المستلزم', supply)

   const isIncrease = change > 0

   if (isIncrease) supply.stock += change
   else if (supply.stock < Math.abs(change))
      throw new ErrorBuilder({
         message: `المخزون لا يكفي للتعديل`,
         statusCode: 400,
         code: 'BAD_REQUEST',
      })
   else supply.stock -= Math.abs(change)

   await supply.save()

   const price = isIncrease
      ? supply.buyingPrice * Math.abs(change)
      : supply.sellingPrice * Math.abs(change)

   const name = supply.name || supply.id

   // تم اضافة  5 من المستلزم اسم بتكلفة شراء سعر جنيها
   // تم استخدام من المستلزم اسم بريح بيع سعر جينها

   const arWordChange = isIncrease ? 'اضافة' : 'استخدام'
   const arWordPriceChange = isIncrease ? 'تكلفة شراء' : 'سعر بيع'
   const extra = isIncrease
      ? ''
      : `بربح ${
           (supply.sellingPrice - supply.buyingPrice) * Math.abs(change)
        } جنيها`

   const message = `تم ${arWordChange} ${Math.abs(
      change
   )} من المستلزم ${name} ب${arWordPriceChange} ${price} جنيها ,${extra}`

   const bill = await Bill.createBill(
      isIncrease ? 'restock' : 'bill',
      [
         {
            id: supply?.id ?? -1,
            supplyName: supply?.name ?? 'اسم غير معروف',
            supplyBuyingPrice: supply?.buyingPrice ?? 0,
            supplySellingPrice: supply?.sellingPrice ?? 0,
            quantity: Math.abs(change) ?? 0,
         },
      ]
   )

   resBuilder(res, 200, message, supply,{
      bill,
   })
})
