const uuid = require('uuid')
const path = require('path')
const {Art, Tag} = require('../models/models')
const { nextTick } = require('process')
const ApiError = require('../error/ApiError')

class ArtController {
    async create (req, res, next) {
        try {
            let {name, tagId, typeId, characterId, authorId} = req.body
            const {img} = req.file
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'img', fileName))

            const art = await Art.create({name, tagId, typeId, characterId, authorId, img: fileName})

            return res.json(art)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll (req, res) {
        let {tagId, typeId, authorId, characterId, limit, page} = req.query
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        let arts;
        if (!tagId && !typeId && !authorId && !characterId) {
            arts = await Art.findAndCountAll({limit, offset})
        }

        return res.json(arts)
    }

    async getOne (req, res) {
        const {id} = req.params
        const art = await Art.findOne(
            {
                where: {id},
                include: [{model: Tag, as: 'tags'}]
            },
        )
        return res.json(art)
    }
}

module.exports = new ArtController()