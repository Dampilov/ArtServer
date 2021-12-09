const Router = require('express')
const router = new Router()

const userRouter = require('./UserRouter')
const artRouter = require('./ArtRouter')
const authorRouter = require('./AuthorRouter')
const tagRouter = require('./TagRouter')
const typeRouter = require('./TypeRouter')
const characterRouter = require('./CharacterRouter')

router.use('/user', userRouter)
router.use('/art', artRouter)
router.use('/author', authorRouter)
router.use('/tag', tagRouter)
router.use('/type', typeRouter)
router.use('/character', characterRouter)

module.exports = router