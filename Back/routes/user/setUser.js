const { user } = require('../../db/sequelize')
const {ValidationError,UniqueConstraintError} = require('sequelize')


module.exports = (app)=>{
    app.post('/api/setuser',(req,res)=>{

        user.create(req.body)
        .then(newUser=>{
            const message = `Utilisateur ${req.body.name} créé avec succès.`
            res.json({message,data: newUser})
        })
        .catch(error => {
			if(error instanceof ValidationError){
				res.status(400).json({message: error.message, data:error})
			}
			if(error instanceof UniqueConstraintError){
				res.status(400).json({message: error.message, data: error})
			}
			const message = `L'utilisateur ${req.body.nom} n'a pas pu etre ajouté. Rééssayez dans quelques instants.`
			res.status(500).json({message,data: error})
		})
    })
}