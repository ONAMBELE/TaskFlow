const {task} = require("../../db/sequelize")


module.exports = (app)=>{

    app.delete("/api/delTask",(req,res)=>{

        task.destroy({where:{id:req.query.id}})
        .then(_task=>{
            res.status(200).json(`La tache ${req.query.id} a été supprimée avec succès.`)
        })
        .catch(error=>{
            const message = `La tache ${req.query.id} n'a pu etre supprimée. Veuiller réessayer dans quelques instants.`
            res.status(500).json({message, data: error})
        })

    })

}