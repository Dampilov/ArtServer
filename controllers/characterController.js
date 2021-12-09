const {Character} = require('../models/models')
const ApiError = require('../error/ApiError')

class CharacterController {
    async create (req, res) {
        const {name} = req.body
        const character = await Character.create({name})
        return res.json(character)
    }

    async getAll (req, res) {
        const characters = await Character.findAll()
        return res.json(characters)
    }
}

module.exports = new CharacterController()