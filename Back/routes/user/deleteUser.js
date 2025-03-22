const {user} = require("../../db/sequelize")
const {task} = require("../../db/sequelize")


module.exports = (app)=>{

    app.delete("/api/delUser",(req,res)=>{

        user.destroy({where:{email:req.query.email}})
        .then(_user=>{
            task.destroy({where:{idUser:req.query.email}})
            .then(_task=>{
                console.log(_task)
                res.status(200).json(`Utilisateur ${req.query.email} supprimé avec succès.`)
            })
            .catch(error=>{
                const message = `Erreur de suppression des taches pour l'utilisateur ${req.query.email}. Veuiller réessayer dans quelques instants.`
                res.status(500).json({message, data: error})
            })
        })
        .catch(error=>{
            const message = `Le compte ${req.query.id} n'a pu etre supprimé. Veuiller réessayer dans quelques instants.`
            res.status(500).json({message, data: error})
        })

    })

}