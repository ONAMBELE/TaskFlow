const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({

    service: "gmail",
    auth:{
        user: "@email",
        pass: "@KEY"
    }
});

const sendEmail = async (email,subject,message,html)=>{

    try{
        console.log("Initialisation avant l'envoie.")
        let info = await transporter.sendMail({
            from: '"TaskFlow" @email',
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