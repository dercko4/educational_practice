const ApiError = require('../ApiError')
const { Request } = require('../models/model')
const sequelize = require('../database')
const { Sequelize } = require('../database')



class Requests {
    async getAll(req, res, next) {
        try {
            const role = req.user.role
            if (role != "admin") {
                return next(ApiError.badRequest("Недостаточно прав!"))
            }
            const requests = await Request.findAll()
            return res.json(requests)
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Что-то пошло не так"))
        }
    }

    async getAllID(req, res, next) {
        try {
            const id_user = req.user.id_user
            const users = await Request.findAll({ where: { id_user: id_user } })
            return res.json({users})
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Что-то пошло не так"))
        }
    }

    async updateAccess(req, res, next) {
        try {
            const {id_request} = req.body
            const role = req.user.role
            if (role != "admin") {
                return next(ApiError.badRequest("Недостаточно прав!"))
            }
            const candidate = await Request.findOne({ where: { id_request: id_request } })
            if (candidate.status != "новое") {
                return next(ApiError.badRequest("Можно изменять только новые заявки"))
            }
            const access = await Request.update({ status: "подтверждено" }, { where: { id_request: id_request, update: Sequelize.NOW } })
            return res.json(access)
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Что-то пошло не так"))
        }
    }

    async updateDenied(req, res, next) {
        try {
            const {id_request} = req.params
            const role = req.user.role
            if (role != "admin") {
                return next(ApiError.badRequest("Недостаточно прав!"))
            }
            const candidate = await Request.findOne({ where: { id_request: id_request } })
            if (candidate.status != "новое") {
                return next(ApiError.badRequest("Можно изменять только новые заявки"))
            }
            const denied = await Request.update({ status: "denied" }, { where: { id_request: id_request, update: Sequelize.NOW } })
            return res.json(denied)
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Что-то пошло не так"))
        }
    }

    async insertRequest(req, res, next) {
        try {
            const id_user = req.user.id_user
            const { data } = req.body
            const request = await Request.create({ id_user: id_user, car_number: data.car_number, description: data.description })
            return res.json(request)
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Что-то пошло не так"))
        }
    }
}


module.exports = new Requests()