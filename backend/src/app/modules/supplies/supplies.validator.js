const { body, param } = require('express-validator')
const { handleValidationErrors, strict } = require('../common/base.validators')

exports.getAllSupplies = [strict]

exports.getSupply = [
   param('id').isNumeric().withMessage('رقم التعريف غير صحيح'),
   handleValidationErrors,
   strict,
]

exports.createSupply = [
   body('name')
      .trim()

      .isLength({ min: 1, max: 255 })
      .withMessage('يجب ان يكون اسم المستلزمات بين 1 و 255 حرفًا فقط'),

   body('description')
      .trim()
      .optional()
      .isLength({ max: 4095 })
      .withMessage('لا يمكن أن يتجاوز الوصف 4095 حرفًا'),

   body('buyingPrice')
      .isFloat({ min: 0.0 })
      .withMessage('يجب ان يكون سعر الشراء عدد عشري اكبر من 0'),

   body('sellingPrice')
      .isFloat({ min: 0.0 })
      .withMessage('يجب ان يكون سعر البيع عدد عشري اكبر من 0'),

   body('stock')
      .isInt({ min: 0 })
      .withMessage('يجب ان تكون الكمية عدد صحيح اكبر من 0'),

   handleValidationErrors,
   strict,
]

exports.updateSupply = [
   param('id').isNumeric().withMessage('رقم التعريف غير صحيح'),

   body('name')
      .optional()
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage('يجب ان يكون اسم المستلزمات بين 1 و 255 حرفًا فقط'),

   body('description')
      .optional()
      .trim()
      .optional()
      .isLength({ max: 4095 })
      .withMessage('لا يمكن أن يتجاوز الوصف 4095 حرفًا'),

   body('buyingPrice')
      .optional()
      .isFloat({ min: 0.0 })
      .withMessage('يجب ان يكون سعر الشراء عدد عشري اكبر من 0'),

   body('sellingPrice')
      .optional()
      .isFloat({ min: 0.0 })
      .withMessage('يجب ان يكون سعر البيع عدد عشري اكبر من 0'),

   body('stock')
      .optional()
      .isInt({ min: 0 })
      .withMessage('يجب ان تكون الكمية عدد صحيح اكبر من 0'),

   handleValidationErrors,
   strict,
]

exports.deleteSupply = [
   param('id').isNumeric().withMessage('رقم التعريف غير صحيح'),

   handleValidationErrors,
   strict,
]
