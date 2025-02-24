const dayOFweek = [
    "MONDAY","TUESDAY","WEDNESDAY","THURSDAY",
    "FRIDAY","SATURDAY","SUNDAY"    
]

module.exports = (sequelize, DataTypes)=>{
	return sequelize.define('task',{
        id:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
        },
        day:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isTypesValid(value){
                    if(!dayOFweek.includes(value.toUpperCase())){
                        throw new Error(`Le jour ${value} n'est pas valide.Il doit appartenir a la liste suivante :${dayOFweek}`)
                    }
                }
            }
        },
        hour:{
            type: DataTypes.TIME,
            allowNull: false
        },
        object:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        priority: {
            type: DataTypes.STRING,
            allowNull: false
        }

	})
}