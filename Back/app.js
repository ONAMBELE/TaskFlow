const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const sequelize = require("./db/sequelize")
const cors = require("cors")
const mail = require("./emails/mailer")
const cron = require("node-cron")

const app = express()
const PORT = 3000

const manageTask = require("./emails/checkTasks")

app
    .use(bodyParser.json())
    .use(express.urlencoded({ extended:true }))
    .use(morgan('dev'))
    .use(cors())


app.get("/",(req,res)=>{
    res.send("Hello depuis l'API.")
})

cron.schedule("*/30 * * * *",()=> {
    console.log("⏳ Attente avant l'envoi...");
    manageTask.check()
   console.log("⏳ Envoi automatique de l'email...");

})

sequelize.initBD()

require("./routes/user/setUser")(app)
require("./routes/task/setTask")(app)
require("./routes/task/getTask")(app)
require("./routes/user/getUser")(app)
require("./routes/task/deleteTask")(app)
require("./routes/task/updateTask")(app)

app.use(({res})=>{
    const message = "Impossible de trouver le service demandé. Veuillez saisir une autre URL."
    res.status(404).json({message})
})


app.listen(PORT,()=>{
    console.log(`L'application écoute sur le port ${PORT}`)
})