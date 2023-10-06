const { Router } = require('express')
const resBuilder = require('../utils/response.builder')
const suppliesRouter = require('../modules/supplies/supplies.routes')
const sessionsRouter = require('../modules/sessions/sessions.routes')

const router = Router()

router.get('/', (req, res) => {
   resBuilder(res, 200, 'Welcome to the API')
})

router.use('/supplies', suppliesRouter)
router.use('/sessions', sessionsRouter)

module.exports = router
