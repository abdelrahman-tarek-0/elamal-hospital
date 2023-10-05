const { Router } = require('express')
const resBuilder = require('../utils/response.builder')
const suppliesRouter = require('../modules/supplies/supplies.routes')

const router = Router()

router.get('/', (req, res) => {
   resBuilder(res, 200, 'Welcome to the API')
})

router.use('/supplies', suppliesRouter)

module.exports = router
