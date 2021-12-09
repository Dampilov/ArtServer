const {Author} = require('../models/models')
const ApiError = require('../error/ApiError')

class AuthorController {
    async create (req, res) {
        const {name} = req.body
        const author = await Author.create({name})
        return res.json(author)
    }

    async getAll (req, res) {
        const names = await Author.findAll()
        return res.json(names)
    }
}

module.exports = new AuthorController()