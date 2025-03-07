const {task} = require("../../db/sequelize")
const {ValidationError,UniqueConstraintError} = require('sequelize')



module.exports = (app)=>{
    app.post('/api/setTask',(req,res)=>{
        
        task.create(req.body)
        .then(newTask=>{
            const message = `La tache ${newTask.id} a bien été ajoutée.`
			res.json({message, data: newTask})
        })
        .catch(error => {
			if(error instanceof ValidationError){
				return res.status(400).json({message: error.message, data:error})
			}
			if(error instanceof UniqueConstraintError){
				return res.status(400).json({message: error.message, data: error})
			}

			const message = `La tache n'a pas pu etre ajoutée. Reessayez dans quelques instants.`
			res.status(500).json({message,data: error})
		})
    })
}