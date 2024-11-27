const ApiError = require('../ApiError')
const jwt = require('jsonwebtoken')
const { User, Request } = require('../models/model')
const sequelize = require('../database');

const generateJwt = (id_user, role) => {
    return jwt.sign
        (
            { id_user, role },
            process.env.SECRET_KEY,
            { expiresIn: '24h' }
        )
}

class AuthController {
    async registration(req, res, next) {
        try {
            const { login, password, FIO, phone, email } = req.body
            if (!login) {
                return next(ApiError.badRequest('Логин не должен быть пустым!'))
            }
            if (!password) {
                return next(ApiError.badRequest('Пароль не должен быть пустым'))
            }
            let candidate = await User.findOne({ where: { login } })
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким логином уже существует!'))
            }
            const user = await User.create({ login, password, FIO, phone, email })
            const token = generateJwt(user.id_user, user.role)
            return res.json({ token })
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Что-то пошло не так"))
        }
    }

    async login(req, res, next) {
        try {
            const { login, password } = req.body
            if (!login) {
                return next(ApiError.badRequest('Логин должен быть не пустым!'))
            }
            if (!password) {
                return next(ApiError.badRequest('Пароль должен быть не пустым!'))
            }
            const user = await User.findOne({ where: { login } })
            if (!user) {
                return next(ApiError.internal('Пользователь не найден!'))
            }
            if (password !== user.password) {
                return next(ApiError.badRequest("Пароли не совпадают!"))
            }
            const token = generateJwt(user.id_user, user.role)
            return res.json({ token })
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Что-то пошло не так"))
        }

    }
}

module.exports = new AuthController()