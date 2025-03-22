const {user} = require("../../db/sequelize")

module.exports = (app)=>{

    app.get("/api/getprofile",(req,res)=>{

        user.findByPk(req.query.email)
        .then(result=>{

            const message = `Account Informations: `
            res.status(200).json({
                message,
                data: {
                    name: result.name,
                    surname: result.surname,
                    email: result.email,
                }
            })
           
        })
        .catch(error=>{
            const message = `Une erreur est survenue lors de la récuperation des informations du compte. Veuillez reessayer dans quelques instants.`
            res.status(500).json({message,data: error})
        })
    })
}
