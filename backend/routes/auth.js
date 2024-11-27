const Router = require('express')
const router = new Router()
const auth = require('../controllers/auth')

router.post('/registration', auth.registration)
router.post('/login', auth.login)

module.exports = router
