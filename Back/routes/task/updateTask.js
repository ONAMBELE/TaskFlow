const {task} = require("../../db/sequelize")


module.exports = (app)=>{

    app.put("/api/updateTask",(req,res)=>{

        task.update(req.body,{where:{id:req.query.id}})
        .then(_task=>{
            res.status(200).json(`La tache ${req.query.id} a bien été mise à jour.`)
        })
        .catch(error=>{
            const message = `Erreur lors de la mise à jour de la tache ${req.query.id}`
            res.status(500).json({message,data: error})
        })

    })

}