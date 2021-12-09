const Router = require('express')
const router = new Router()
const controller = require('../controllers/tagController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), controller.create)
router.get('/', controller.getAll)

module.exports = router