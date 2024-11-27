const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const User = sequelize.define("users", {
    id_user: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    FIO: {type: DataTypes.STRING},
    phone: {type: DataTypes.BIGINT},
    email: {type: DataTypes.STRING},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "user"}
}, {timestamps: false})

const Request = sequelize.define("requests", {
    id_request: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_user: {type: DataTypes.INTEGER, references: {model: User, key: "id_user"}},
    description: {type: DataTypes.STRING},
    car_number: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING, defaultValue: "новое"}
}, {timestamps: false})


User.hasMany(Request, {
    foreignKey: "id_user"
})

module.exports={
    User,
    Request
}