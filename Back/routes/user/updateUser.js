const {user} = require("../../db/sequelize")


module.exports = (app)=>{

    app.put("/api/updateUser",(req,res)=>{

        user.update(req.body,{where:{email:req.query.email}})
        .then(_user=>{
            res.status(200).json(`Les informations de l'utilisateur ${req.query.email} ont bien été mises à jour.`)
        })
        .catch(error=>{
            const message = `Erreur lors de la mise à jour de l'utilisateur ${req.query.email}`
            res.status(500).json({message,data: error})
        })

    })

}