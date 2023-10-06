const { body, param } = require('express-validator')
const { handleValidationErrors, strict } = require('../common/base.validators')

exports.getAllSessions = [strict]

exports.getSession = [
   param('id').isNumeric().withMessage('رقم التعريف غير صحيح'),
   handleValidationErrors,
   strict,
]

exports.createSession = [
   body('name')
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage('يجب ان يكون اسم الجلسة بين 1 و 255 حرفًا فقط'),

   body('supplies')
      .optional()
      .isArray()
      .withMessage('يجب ان يكون المستلزمات مصفوفة فقط'),

   body('supplies.*.id')
      .optional()
      .isNumeric()
      .withMessage('رقم التعريف غير صحيح'),

   body('supplies.*.quantity')
      .optional()
      .isInt({
         min: 0,
      })
      .withMessage('الكمية يجب ان تكون رقم صحيح اكبر من الصفر'),

   handleValidationErrors,
   strict,
]

exports.updateSession = [
   param('id').isNumeric().withMessage('رقم التعريف غير صحيح'),

   body('name')
      .optional()
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage('يجب ان يكون اسم الجلسة بين 1 و 255 حرفًا فقط'),

   body('supplies')
      .optional()
      .isArray()
      .withMessage('يجب ان يكون المستلزمات مصفوفة فقط'),

   body('supplies.*.id')
      .optional()
      .isNumeric()
      .withMessage('رقم التعريف غير صحيح'),

   body('supplies.*.quantity')
      .optional()
      .isInt({
         min: 0,
      })
      .withMessage('الكمية يجب ان تكون رقم صحيح اكبر من الصفر'),


   handleValidationErrors,
   //strict,
]

exports.deleteSession = [
   param('id').isNumeric().withMessage('رقم التعريف غير صحيح'),

   handleValidationErrors,
   strict,
]

exports.useSession = [
   param('id').isNumeric().withMessage('رقم التعريف غير صحيح'),

   handleValidationErrors,
   strict,
]
