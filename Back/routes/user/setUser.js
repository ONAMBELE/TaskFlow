const { user } = require('../../db/sequelize')
const bcrypt = require("bcrypt")
const {ValidationError,UniqueConstraintError} = require('sequelize')


module.exports = (app)=>{
    app.post('/api/setuser',(req,res)=>{

		bcrypt.hash(req.body.password,10)
        .then(Password=>{
			user.create(req.body)
			.then(newUser=>{
				user.update({password:Password},{where:{email:req.body.email}})
				const message = `Utilisateur ${req.body.name} créé avec succès.`
				res.json({message,data: newUser.name})
			})
			.catch(error => {
				if(error instanceof ValidationError){
					return res.status(400).json({message: error.message, data:error})
				}
				if(error instanceof UniqueConstraintError){
					return res.status(400).json({message: error.message, data: error})
				}
				const message = `L'utilisateur ${req.body.nom} n'a pas pu etre ajouté. Rééssayez dans quelques instants.`
				res.status(500).json({message,data: error})
			})
		})
    })
}