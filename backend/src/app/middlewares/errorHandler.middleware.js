const ErrorBuilder = require('../utils/error.builder.js');
const resBuilder = require('../utils/response.builder.js');


const arMapper = {
    'name':'الأسم',
    'SupplyId':"المستلزم",
    'SessionId':"المستلزم",
};

const errorHandler = (err, req, res, next) => {
   console.log(err);
    if(err?.name === 'SequelizeUniqueConstraintError'){
        const path = err?.errors?.[0]?.path;
        
        const error = new ErrorBuilder(
            {
                statusCode: 400,
                message: `${arMapper[path]} موجود مسبقاً`,
                code: 'UNIQUE_CONSTRAINT_ERROR',
            }
        )

        return resBuilder(res, error.statusCode, error.message, null, {
            errOpj: error,
            originalError: err,
        });
    }


    return resBuilder(res, err.statusCode, err.message, err?.data, {
        errOpj: err,
     })
}

module.exports = errorHandler;