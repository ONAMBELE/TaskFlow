
module.exports = (sequelize, DataTypes)=>{
    
    return sequelize.define("user",{
        name:{
            type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull:{msg:"Le nom du client est une propriéte requise."},
				notEmpty: {msg:"Le nom du client ne peut etre vide."}
			}
        },
        surname: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull:{msg:"Le prénom est une propriéte requise."},
				notEmpty: {msg:"Le prénom ne peut etre vide."}
			}
		},
		email: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			unique:{
                msg: `Cette adresse possède déjà un compte. Veuillez essayer une autre adresse email.`
            },
			validate:{
                notEmpty: {msg: "L'email ne peut etre vide."},
                notNull: {msg: "L'email ne peut etre null."},
                isEmail: {msg: 'Veuillez entrer une adresse email valide(foo@bar.com).'}
            }
		},
		password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                  args: [9, 120],
                  msg: 'Le mot de passe doit contenir entre 9 et 120 caractères.'
                },
                notEmpty: { msg: 'Le mot de passe ne peut pas être vide.' },
                notNull: { msg: 'Le mot de passe est une propriété requise.'}
            }
        }  
    })

}