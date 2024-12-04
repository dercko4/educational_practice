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
                res.status(500).json({message: "Логин не должен быть пустым!"})
                return
            }
            if (!password) {
                res.status(500).json({message: "Логин не должен быть пустым!"})
                return
            }
            let candidate = await User.findOne({ where: { login } })
            if (candidate) {
                res.status(500).json({message: 'Пользователь с таким логином уже существует!'})
                return
            }
            const user = await User.create({ login, password, FIO, phone, email })
            const token = generateJwt(user.id_user, user.role)
            return res.json({ token })
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Что-то пошло не так"})
            return
        }
    }

    async login(req, res, next) {
        try {
            const { login, password } = req.body
            if (!login) {
                res.status(500).json({message: 'Логин должен быть не пустым!'})
                return
            }
            if (!password) {
                res.status(500).json({message: 'Пароль должен быть не пустым!'})
                return
            }
            const user = await User.findOne({ where: { login } })
            if (!user) {
                res.status(500).json({message: 'Пользователь не найден!'})
                return
            }
            if (password !== user.password) {
                res.status(500).json({message: "Пароли не совпадают!"})
                return
            }
            const token = generateJwt(user.id_user, user.role)
            res.json({ token })
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Что-то пошло не так"})
            return
        }

    }
}

module.exports = new AuthController()