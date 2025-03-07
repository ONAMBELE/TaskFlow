//Ce fichier a pour role de collecter nos taches et de marquer celles dont les dates/heures de réalisation 
// sont déjà depassées et de notifier l'utilisateur des tache à réaliser 
const {user,task} = require("../db/sequelize")
const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]

module.exports = ()=>{

    const currentDate = new Date();
    const year = currentDate.getFullYear(); // Année
    const month = currentDate.getMonth() + 1; // Mois (0-11, donc on ajoute 1)
    const day = currentDate.getDate(); // Jour du mois
    const hours = currentDate.getHours(); // Heures
    const minutes = currentDate.getMinutes(); // Minutes
    const seconds = currentDate.getSeconds(); // Secondes

    console.log(`Date actuelle : ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);

    user.findAll()
    .then(_user=>{
        console.log(_user)
        if (_user === null) {
            console.log("La BD est vide.")
            return
        }
        _user.forEach(element => {
            console.log("---1---")
            console.log('idUser: ')
           task.findAll({where:{treated: false,idUser:element.email}})
            .then(_task=>{
                if (_task == []) {
                    console.log("Aucune task");
                    return
                }
                _task.forEach(elt=>{
                    console.log("---2---")
                    const hour = parseInt(elt.hour.split(",")[0])
                    if (days.indexOf(elt) === -1 && hours >= hour && hours < hour+2) {
                        task.update({treated:true}, {
                            where: {id: elt.id}
                        })
                        .then(_=>{
                            console.log("Mise à jour réussie.")
                        })
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