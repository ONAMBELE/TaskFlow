const {Sequelize, DataTypes} = require("sequelize")
const userModel = require("../models/user")
const taskModel = require("../models/task")


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});


sequelize.authenticate()
    .then(() => console.log("Connexion PostgreSQL réussie !"))
    .catch(err => console.error("Erreur de connexion :", err));

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