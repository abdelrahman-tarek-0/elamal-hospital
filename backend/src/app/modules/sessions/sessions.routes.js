const { Router } = require('express')

const {
   getAllSessions,
   getSession,
   createSession,
   updateSession,
   deleteSession,
} = require('./sessions.controller')
const {
   getAllSessions: getAllSessionsValidator,
   getSession: getSessionValidator,
   createSession: createSessionValidator,
   updateSession: updateSessionValidator,
   deleteSession: deleteSessionValidator,
} = require('./sessions.validator')

const router = Router()

router.get('/', getAllSessionsValidator, getAllSessions)
router.get('/:id', getSessionValidator, getSession)
router.post('/', createSessionValidator, createSession)
router.patch('/:id', updateSessionValidator, updateSession)
router.delete('/:id', deleteSessionValidator, deleteSession)

module.exports = router
