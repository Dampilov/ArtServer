const Router = require('express')
const router = new Router()
const controller = require('../controllers/userController')
const middleware = require('../middleware/authMiddleware')

router.post('/registration', controller.registration)
router.post('/login', controller.login)

router.get('/auth', middleware, controller.check)

module.exports = router