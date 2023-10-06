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

   body('description')
      .trim()
      .optional()
      .isLength({ max: 4095 })
      .withMessage('لا يمكن أن يتجاوز الوصف 4095 حرفًا'),


   handleValidationErrors,
   //strict,
]

exports.updateSession = [
   param('id').isNumeric().withMessage('رقم التعريف غير صحيح'),

   body('name')
      .optional()
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage('يجب ان يكون اسم الجلسة بين 1 و 255 حرفًا فقط'),

   body('description')
      .optional()
      .trim()
      .optional()
      .isLength({ max: 4095 })
      .withMessage('لا يمكن أن يتجاوز الوصف 4095 حرفًا'),


   handleValidationErrors,
   //strict,
]

exports.deleteSession = [
   param('id').isNumeric().withMessage('رقم التعريف غير صحيح'),

   handleValidationErrors,
   strict,
]
