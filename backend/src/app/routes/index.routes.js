const { Router } = require('express')
const resBuilder = require('../utils/response.builder')

const router = Router()

router.get('/', (req, res) => {
   resBuilder(res, 200, 'Welcome to the API')
})

module.exports = router
