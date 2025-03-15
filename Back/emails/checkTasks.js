//Ce fichier a pour role de collecter nos taches et de marquer celles dont les dates/heures de réalisation 
// sont déjà depassées et de notifier l'utilisateur des tache à réaliser 
const { Op } =  require("sequelize");
const {user,task} = require("../db/sequelize")
const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
const mail = require("./mailer")

const check = ()=>{

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear(); // Année
    const currentMonth = currentDate.getMonth() + 1; // Mois (0-11, donc on ajoute 1)
    const currentDay = currentDate.getDate(); // Jour du mois
    const CurrentHour = currentDate.getHours(); // Heures
    const minutes = currentDate.getMinutes(); // Minutes
    const seconds = currentDate.getSeconds(); // Secondes

    //console.log(`Date actuelle : ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
    const date = new Date(`${currentYear}-${currentMonth}-${currentDay}`)
    //console.log(date)
    user.findAll()
    .then(users=>{
        //console.log(_user)
        if (users === null || users === "null") {
            console.log("La BD est vide.")
            return
        }
        users.forEach(subUser => {
            console.log("---1---")
            console.log('idUser: ')
           task.findAll({
                where:{
                    [Op.or]:[
                        {treated: "false"},
                        {treated: "ongoing"}
                    ],
                    idUser:subUser.email
                }
            })
            .then(_task=>{
                //console.log(_task)
                if (_task == []) {
                    console.log("Aucune task");
                    return
                }
                _task.forEach(elt=>{
                    console.log("---2---")
            
                    const deadLine = new Date(elt.deadLine)
                    if (elt.deadLine === null) {
                        console.log("---3---")
                        console.log(elt.dataValues)
                        let end = 0;
                        console.log(days.indexOf(elt.day)) 
                        console.log(currentDate.getDay()+1)
                        if (days.indexOf(elt.day) === (currentDate.getDay()+1)%7) {
                            mail.sendEmail(elt.idUser,`Rappel Taskflow`,
                                `Cher ${elt.idUser} vous avez l'activité "${elt.subject}" à realiser demain.`,
                                `<li>${elt.day}</li> <li>${elt.hour}</li> <li>${elt.priority}</li>
                                <li>${elt.object}</li> <li>${elt.day}</li> <li>${elt.deadLine}</li>
                                `
                            )
                            console.log("Presque à terme.")
                            return
                        }

                        const dateTask = new Date()
                        dateTask.setHours(elt.hour.split(":")[0]);
                        dateTask.setMinutes(elt.hour.split(":")[1]);
                        dateTask.setSeconds(0);
                        currentDate.setSeconds(0)

                        if (dateTask > currentDate) {
                            mail.sendEmail(elt.idUser,`Rappel`,
                                `Cher ${elt.idUser} vous avez l'activité "${elt.object}" à realiser bientot.`,
                                `Cher ${elt.idUser} vous avez l'activité "${elt.object}" à realiser bientot.
                                <li>${elt.day}</li> <li>${elt.hour}</li> <li>${elt.priority}</li>
                                <li>${elt.object}</li> <li>${elt.day}</li>
                                `
                            )
                            return
                        } 

                        if (dateTask === currentDate || (currentDate <= dateTask.setHours(dateTask.getHours()+1 && currentDate <= dateTask.getHours()+elt.duration))) {
                            task.update({treated: "ongoing"},{
                                where:{
                                    id: elt.id
                                }
                            })
                            console.log("En cours...")
                            return
                        }
                        dateTask.setHours(dateTask.getHours()+elt.duration)
                        if (dateTask < currentDate) {
                            task.update({treated: "treated"},{
                                where:{
                                    id: elt.id
                                }
                            })
                            console.log("Finish")
                        }

                    }
                })
            })
            .catch(err=>{
                console.log("_Error: " + err)
            })
        });        
        
    })
    .catch(error=>{
        console.log("Error: " + error)
    })

} 

module.exports = { check }