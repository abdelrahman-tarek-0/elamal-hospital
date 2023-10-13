const { Router } = require('express')

const {
   getAllSessions,
   getSession,
   createSession,
   updateSession,
   deleteSession,
   checkSession,
   useSession,
} = require('./sessions.controller')
const {
   getAllSessions: getAllSessionsValidator,
   getSession: getSessionValidator,
   createSession: createSessionValidator,
   updateSession: updateSessionValidator,
   deleteSession: deleteSessionValidator,
   checkSession: checkSessionValidator,
   useSession: useSessionValidator,
} = require('./sessions.validator')

const router = Router()

router.get('/', getAllSessionsValidator, getAllSessions)
router.get('/:id', getSessionValidator, getSession)
router.post('/', createSessionValidator, createSession)
router.get('/:id/check', checkSessionValidator, checkSession)
router.post('/:id/use', useSessionValidator, useSession)
router.patch('/:id', updateSessionValidator, updateSession)
router.delete('/:id', deleteSessionValidator, deleteSession)

module.exports = router
