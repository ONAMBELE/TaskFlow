const nodemailer = require("nodemailer")





const transporter = nodemailer.createTransport({

    service: "gmail",
    auth:{
        user: "konibryan4@gmail.com",
        pass: "wqkv suxy ivtp kxbm"
    }
});

const sendEmail = async ()=>{

    try{
        let info = await transporter.sendMail({
            from: '"TaskFlow" konibryan4@gmail.com',
            to: "bryan.koni@facsciences-uy1.cm",
            subject: "Teste de notifications automatiques",
            text: "Ceci est un email envoyé automatiquement.",
            html: "<b>📧 Ceci est un email envoyé automatiquement avec nodeMailer.</b>"
        });
        console.log("📧 Email envoyé : ", info.response);
    } catch (error) {
        console.error("❌ Erreur d'envoi d'email :", error);
    }
};

module.exports = { sendEmail }