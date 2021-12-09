const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, MyArt, MyLikes} = require('../models/models') 
const { json } = require('sequelize/dist')

const generateJWT = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        process.env.KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration (req, res, next) {
        const {login, password, role} = req.body
        if (!login || !password) {
            return next(ApiError.badRequest('Неправильный логин или пароль'))
        }

        const candidate = await User.findOne({where: {login}})
        if (candidate) {
            return next(ApiError.badRequest('Логин занят, выберите другой'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login, role, password: hashPassword})
        const myArt = await MyArt.create({userId: user.id})
        const myLikes = await MyArt.create({userId: user.id})
        const token = generateJWT(user.id, user.login, user.role)
        return res.json({token})
    }

    async login (req, res, next) {
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Пароль не верный'))
        }
        const token = generateJWT(user.id, user.login, user.role)
        return res.json({token})
    }

    async check (req, res, next) {
        const token = generateJWT(req.user.id, req.user.login, req.user.role)
        return token
    }
}

module.exports = new UserController()