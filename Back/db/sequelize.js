const {Sequelize, DataTypes} = require("sequelize")
const userModel = require("../models/user")
const taskModel = require("../models/task")


const sequelize = new Sequelize("taskflow",'postgres',"THE BRAYN4",{
    host:'localhost',
    dialect: "postgres",
    dialectOptions:{
        timezone: 'Etc/GMT-2'
    },
    logging: false
})

const user = userModel(sequelize,DataTypes)
const task = taskModel(sequelize, DataTypes)


const initBD = ()=>{
    return sequelize.sync({force:false})
    .then(()=>{
        task.belongsTo(user,{foreignKey: 'idUser'})
        sequelize.sync({force: false})
    })
}

module.exports = {initBD, task, user}