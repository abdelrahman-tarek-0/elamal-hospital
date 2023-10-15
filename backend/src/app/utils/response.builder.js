/**
 *
 * @param {Express.Response} res
 * @param {Number} status
 * @param {string} message
 * @param {Object|Array| Object[]} data
 * @param {Object|Array| Object[]} additionalInfo
 * @returns
 */
module.exports = (
   res,
   status = 200,
   message = '',
   data = null,
   additionalInfo = {}
) =>
   res.status(status).json({
      status: status < 400 ? 'success' : status < 500 ? 'fail' : 'error',
      statusCode: status,
      message,
      ...additionalInfo,
      data,
   })
