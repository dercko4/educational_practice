const ApiError = require('../ApiError')
const { Request } = require('../models/model')
const sequelize = require('../database')




class Requests {
    async getAll(req, res, next) {
        try {
            const role = req.user.role
            if (role != "admin") {
                return next(ApiError.badRequest("Недостаточно прав!"))
            }
            const requests = await Request.findAll()
            return res.json({ requests })
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Что-то пошло не так"))
        }
    }

    async getAllID(req, res, next) {
        try {
            const id_user = req.user.id_user
            const users = await Request.findAll({ where: { id_user: id_user } })
            return res.json({ users })
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Что-то пошло не так"))
        }
    }

    async updateAccess(req, res, next) {
        try {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy + '/' + mm + '/' + dd;
            const data = req.body
            const role = req.user.role
            if (role != "admin") {
                return next(ApiError.badRequest("Недостаточно прав!"))
            }
            const candidate = await Request.findOne({ where: { id_request: data.id_request } })
            if (candidate.status != "новое") {
                return next(ApiError.badRequest("Можно изменять только новые заявки"))
            }
            console.log(Seq)
            const access = await Request.update({ status: "подтверждено", update: today}, { where: { id_request: data.headers.data.id_request, update: Sequelize.NOW } })
            return res.json(access)
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Что-то пошло не так"))
        }
    }

    async updateDenied(req, res, next) {
        try {
            const data = req.body
            const role = req.user.role
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy + '/' + mm + '/' + dd;
            if (role != "admin") {
                return next(ApiError.badRequest("Недостаточно прав!"))
            }
            const candidate = await Request.findOne({ where: { id_request: data.headers.data.id_request } })
            if (candidate.status != "новое") {
                return next(ApiError.badRequest("Можно изменять только новые заявки"))
            }
            const denied = await Request.update({ status: "denied", update: today }, { where: { id_request: data.headers.data.id_request} })
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