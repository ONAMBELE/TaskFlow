
module.exports = (sequelize, DataTypes)=>{
	return sequelize.define('task',{
        id:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
        },
        day:{
            type: DataTypes.STRING,
            allowNull: false
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
        },
        treated: {
            type: DataTypes.STRING,
            defaultValue: "false"
        },
        deadLine:{
            type: DataTypes.DATEONLY
        },
        duration:{
            type: DataTypes.INTEGER,
            defaultValue: 2
        }

	})
}