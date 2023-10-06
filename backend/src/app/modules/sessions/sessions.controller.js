const Session = require('./sessions.model')
const { SessionSupply } = require('../common/models.associations')

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

   if (!req?.body?.supplies) return resBuilder(res, 200, 'تم تخزين الجلسة', session)
   

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
