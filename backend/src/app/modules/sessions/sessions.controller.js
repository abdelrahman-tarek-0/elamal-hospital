const Session = require('./sessions.model')
const Supply = require('../supplies/supplies.model')
const { SessionSupply } = require('../_common/models.associations')
const Bill = require('../bills/bills.model')

const resBuilder = require('../../utils/response.builder')
const ErrorBuilder = require('../../utils/error.builder')
const catchAsync = require('../../utils/catch-async')

exports.getAllSessions = catchAsync(async (_req, res) => {
   const sessions = await Session.getAllSessions()

   resBuilder(res, 200, 'تم استدعاء الجلسات', sessions)
})

exports.getSession = catchAsync(async (req, res) => {
   const session = await Session.getSessionById(req.params.id)

   if (!session)
      throw new ErrorBuilder({
         message: `المورد رقم ${req.params.id} غير موجود`,
         statusCode: 404,
         code: 'RESOURCES_NOT_FOUND',
      })

   resBuilder(res, 200, 'تم استدعاء الجلسة', session)
})

exports.createSession = catchAsync(async (req, res) => {
   let session = await Session.createSession(req.body)

   if (!req?.body?.supplies)
      return resBuilder(res, 200, 'تم تخزين الجلسة', session)

   const associate = await SessionSupply.addSuppliesToSession(
      session,
      req?.body?.supplies
   )

   resBuilder(res, 201, 'تم تخزين الجلسة', associate)
})

exports.updateSession = catchAsync(async (req, res) => {
   const session = await Session.updateSession(req.params.id, req.body)

   if (!session)
      throw new ErrorBuilder({
         message: `المورد رقم ${req.params.id} غير موجود`,
         statusCode: 404,
         code: 'RESOURCES_NOT_FOUND',
      })

   if (!req?.body?.supplies) {
      return resBuilder(res, 200, 'تم تعديل الجلسة', session)
   }

   const associate = await SessionSupply.updateSuppliesOfSession(
      session,
      req?.body?.supplies
   )

   resBuilder(res, 200, 'تم تعديل الجلسة', associate)
})

exports.deleteSession = catchAsync(async (req, res) => {
   const session = await Session.deleteSession(req.params.id)

   if (!session)
      throw new ErrorBuilder({
         message: `المورد رقم ${req.params.id} غير موجود`,
         statusCode: 404,
         code: 'RESOURCES_NOT_FOUND',
      })

   resBuilder(res, 200, 'تم حذف الجلسة', session)
})

exports.checkSession = catchAsync(async (req, res) => {
   const session = await Session.getSessionById(req.params.id)
   if (!session)
      throw new ErrorBuilder({
         message: `المورد رقم ${req.params.id} غير موجود`,
         statusCode: 404,
         code: 'RESOURCES_NOT_FOUND',
      })

   if (!session?.Supplies?.length > 0) {
      return resBuilder(
         res,
         200,
         'لايمكن استخدام الجلسة لعدم وجود مستلزمات',
         session,
         {
            meta: [
               {
                  message: 'الجلسة جاهزة لاكنها لا تحتوي علي مستلزمات',
                  level: 'warning',
               },
            ],
            isOkayToUpdate: false,
         }
      )
   }

   const meta = []
   const updatedSupplies = []
   let totalSuppliesProfit = 0
   let isOkayToUpdate = true
   let totalSupplies = 0
   let totalQuantitySupplies = 0

   for (const supply of session.Supplies) {
      const sessionSupplyData = supply?.SessionSupply

      if (supply.stock < sessionSupplyData?.quantity) {
         isOkayToUpdate = false
         meta.push({
            message: `المستلزم '${supply.name}' يحتوي علي ${supply.stock} بينما تحوال استخدام ${sessionSupplyData?.quantity} لا يوجد موارد كافية`,
            level: 'error',
         })
      } else {
         updatedSupplies.push({
            id: supply.id,
            stock: supply.stock - sessionSupplyData?.quantity,
         })

         const totalBuying = supply.buyingPrice * sessionSupplyData?.quantity
         const totalSelling = supply.sellingPrice * sessionSupplyData?.quantity
         const totalProfit = totalSelling - totalBuying

         totalSuppliesProfit += totalProfit

         totalSupplies += 1
         totalQuantitySupplies += sessionSupplyData?.quantity

         meta.push({
            message: `المستلزم '${supply.name}' سيتم استخدام ${sessionSupplyData?.quantity} صافي ربح ${totalProfit} جنيه`,
            level: 'info',
         })
      }
   }

   meta.push({
      message: `سيتم استخدام عدد ${totalSupplies} من المستلزمات بكمية ${totalQuantitySupplies} بصافي ربح ${totalSuppliesProfit} جنيه`,
      level: 'summary',
   })

   if (isOkayToUpdate) {
      return resBuilder(res, 200, 'جلسة جاهزة للأستخدام', session, {
         meta,
         isOkayToUpdate,
      })
   }

   resBuilder(res, 200, 'لايمكن استخدام الجلسة نظرا لوجود اخطاء', session, {
      meta,
      isOkayToUpdate,
   })
})

exports.useSession = catchAsync(async (req, res) => {
   const session = await Session.getSessionById(req.params.id)

   if (!session)
      throw new ErrorBuilder({
         message: `المورد رقم ${req.params.id} غير موجود`,
         statusCode: 404,
         code: 'RESOURCES_NOT_FOUND',
      })

   if (!session?.Supplies?.length > 0) {
      return resBuilder(
         res,
         200,
         'لم يتم استخدام الجلسة لعدم وجود مستلزمات',
         session,
         {
            meta: [
               {
                  message: 'الجلسة جاهزة لاكنها لا تحتوي علي مستلزمات',
                  level: 'warning',
               },
            ],
            isUpdated: false,
         }
      )
   }

   const meta = []
   let isOkayToUpdate = true
   const updatedSupplies = []
   let totalSuppliesProfit = 0
   const updateSupplies = session?.Supplies || []

   let i = 0
   for (const supply of updateSupplies) {
      const sessionSupplyData = supply?.SessionSupply

      if (supply.stock < sessionSupplyData?.quantity) {
         isOkayToUpdate = false
         meta.push({
            message: `المستلزم '${supply.name}' يحتوي علي ${supply.stock} بينما تحوال استخدام ${sessionSupplyData?.quantity} لا يوجد موارد كافية`,
            level: 'error',
         })
      } else {
         updatedSupplies.push({
            id: supply.id,
            stock: supply.stock - sessionSupplyData?.quantity,
         })

         const totalBuying = supply.buyingPrice * sessionSupplyData?.quantity
         const totalSelling = supply.sellingPrice * sessionSupplyData?.quantity
         const totalProfit = totalSelling - totalBuying

         totalSuppliesProfit += totalProfit

         meta.push({
            message: `المستلزم '${supply.name}' تم استخدام ${sessionSupplyData?.quantity} بصافي ربح ${totalProfit} جنيه`,
            level: 'info',
         })
      }
      i = i + 1
   }
   meta.push({
      message: `اجمالي المستلزمات ${i} بصافي ربح ${totalSuppliesProfit} جنيه`,
      level: 'summary',
   })


   if (isOkayToUpdate) {
      const supplies = await Supply.updateManySupplies(updatedSupplies)

      const bill = await Bill.createBill(
         'bill',
         updateSupplies?.map((supply) => ({
            id: supply?.id ?? -1,
            supplyName: supply?.name ?? 'غير معروف',
            supplyBuyingPrice: supply?.buyingPrice ?? 0,
            supplySellingPrice: supply?.sellingPrice ?? 0,
            quantity: supply?.SessionSupply?.quantity ?? 0,
         })) ?? []
      ) || {}

      return resBuilder(res, 200, 'تم استخدام الجلسة', supplies, {
         meta,
         isUpdated: isOkayToUpdate,
         bill,
      })
   }

   resBuilder(res, 200, 'لم يتم استخدام الجلسة نظرا لوجود اخطاء', session, {
      meta,
      isUpdated: isOkayToUpdate,
   })
})
