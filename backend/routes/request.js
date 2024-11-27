const Router = require('express')
const router = new Router()
const request = require("../controllers/request")
const authMiddleware = require("../authMiddleware")



router.get('/getall', authMiddleware, request.getAll) //выборка у админа
router.get('/getAllID', authMiddleware, request.getAllID) // выборка у пользователя. все данные
router.patch('/access', authMiddleware, request.updateAccess) // подтверждение заявки
router.patch('/denied', authMiddleware, request.updateDenied) // отклонение заявки
router.post('/insert', authMiddleware, request.insertRequest) // внесение заявки


module.exports = router