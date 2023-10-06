const { Router } = require('express')

const {
   getAllSessions,
   getSession,
   createSession,
   updateSession,
   deleteSession,
   useSession,
} = require('./sessions.controller')
const {
   getAllSessions: getAllSessionsValidator,
   getSession: getSessionValidator,
   createSession: createSessionValidator,
   updateSession: updateSessionValidator,
   deleteSession: deleteSessionValidator,
   useSession: useSessionValidator,
} = require('./sessions.validator')

const router = Router()

router.get('/', getAllSessionsValidator, getAllSessions)
router.get('/:id', getSessionValidator, getSession)
router.post('/', createSessionValidator, createSession)
router.post('/:id/use', useSessionValidator, useSession)
router.patch('/:id', updateSessionValidator, updateSession)
router.delete('/:id', deleteSessionValidator, deleteSession)

module.exports = router
