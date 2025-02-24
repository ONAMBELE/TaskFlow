const {user} = require("../../db/sequelize")
const bcrypt = require("bcrypt")

module.exports = (app)=>{

    app.get("/api/getuser",(req,res)=>{

        console.log(req.query)
        user.findByPk(req.query.email)
        .then(_user=>{
            if (_user === null) {
                const message = `L'utilisateur ${req.query.email} n'existe pas.`
                res.status(400).json({message})
            } else {
                bcrypt.compare(req.query.password,_user.password)
                .then(result=>{

                    if (result === true) {
                        const message = `Authentification reussie`
                        res.status(200).json({
                            message,
                            data: {
                                name: _user.name,
                                email: _user.email
                            }
                        })
                    } else {
                        const message = `Mot de passe est incorrect.`
                        res.status(400).json({message})
                    }
                })
            }
        })
        .catch(error=>{
            const message = `Une erreur est survenue lors de l'authentification. Veuillez reessayer dans quelques instants.`
            res.status(500).json({message,data: error})
        })
    })
}
