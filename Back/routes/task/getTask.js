const {task} = require("../../db/sequelize")


module.exports = (app)=>{

    app.get('/api/getTask',(req,res)=>{

        task.findAll({where:{idUser: req.query.idUser}})
        .then(_task=>{
            if (_task.length === 0) {
                const message = `Aucune tache pour l'utilisateur ${req.query.idUser}`
                return res.status(400).json({message})
            }
            const message = `Liste des taches de l'utilisateur ${req.query.idUser}`
            res.status(200).json({message,data: _task})
        })
        .catch(error=>{
            const message = "Erreur de requete."
            res.status(400).send({message, data: error})
        })
    })
}