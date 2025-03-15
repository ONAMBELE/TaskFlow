const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({

    service: "gmail",
    auth:{
        user: "konibryan4@gmail.com",
        pass: "wqkv suxy ivtp kxbm"
    }
});

const sendEmail = async (email,subject,message,html)=>{

    try{
        console.log("Initialisation avant l'envoie.")
        let info = await transporter.sendMail({
            from: '"TaskFlow" konibryan4@gmail.com',
            to: email,
            subject: subject,
            text: message,
            html: `<b>📧 ${html}</b>`
        });
        console.log("📧 Email envoyé : ", info.response);
    } catch (error) {
        console.error("❌ Erreur d'envoi d'email :", error);
    }
};

module.exports = { sendEmail }