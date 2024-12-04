const ApiError = require('../ApiError')
const { Request } = require('../models/model')
const sequelize = require('../database')

class Requests {
    async getAll(req, res, next) {
        try {
            const role = req.user.role
            if (role != "admin") {
                return res.status(500).json({message: "Недостаточно прав!"})
                
            }
            const requests = await Request.findAll()
            return res.json(requests)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Не удалось вывести все данные" })
        }
    }

    async getAllID(req, res, next) {
        try {
            const id_user = req.user.id_user
            const requests = await Request.findAll({ where: { id_user: id_user } })
            res.json(requests)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Не удалось вывести все данные по этому ID" })
        }
    }

    async updateAccess(req, res, next) {
        try {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy + '/' + mm + '/' + dd;
            const { id_request } = req.body
            const role = req.user.role
            if (role != "admin") {
                return res.status(500).json({message: "Недостаточно прав!"})
            }
            const candidate = await Request.findOne({ where: { id_request: id_request } })
            if (candidate.status != "новое") {
                return res.status(500).json({message: "Можно изменять только новые заявки"})
            }
            const access = await Request.update({ status: "подтверждено", update: today },
                { where: { id_request: id_request } })
            return res.json(access)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Не удалось принять заявку"})
        }
    }

    async updateDenied(req, res, next) {
        try {
            const { id_request } = req.body
            console.log(req.body)
            const role = req.user.role
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy + '/' + mm + '/' + dd;
            if (role != "admin") {
                return res.status(500).json({message: "Недостаточно прав!"})
            }
            const candidate = await Request.findOne({ where: { id_request: id_request } })
            if (candidate.status != "новое") {
                return res.status(500).json({message: "Можно изменять только новые заявки"})
            }
            const denied = await Request.update({ status: "denied", update: today },
                { where: { id_request: id_request } })
            return res.json(denied)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Не удалось отклонить заявку"})
        }
    }

    async insertRequest(req, res, next) {
        try {
            const id_user = req.user.id_user
            const { car_number, description } = req.body
            const request = await Request.create({
                id_user: id_user, car_number: car_number,
                description: description
            })
            return res.json(request)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Не удалось создать заявку"})
        }
    }
}


module.exports = new Requests()