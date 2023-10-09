const ErrorBuilder = require('../utils/error.builder.js');
const resBuilder = require('../utils/response.builder.js');


const arMapper = {
    'name':'الأسم',
};

const errorHandler = (err, req, res, next) => {
   
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
        });
    }


    return resBuilder(res, err.statusCode, err.message, err?.data, {
        errOpj: err,
     })
}

module.exports = errorHandler;