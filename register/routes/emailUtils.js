require('dotenv').config();
const nodemailer = require('nodemailer');

// Créer le transporteur d'email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Fonction pour envoyer un email
function sendEmail(to, subject, text) {
    const mailOptions = {
        from: 'nadrawertani22@gmail.com',  // Ton email
        to,                                // Destinataire
        subject,                           // Sujet
        text                               // Corps du message
    };

    return transporter.sendMail(mailOptions)
        .then(info => {
            console.log('Email envoyé:', info.response); // Affiche la réponse de l'email
            return info;
        })
        .catch(err => {
            console.error('Erreur lors de l\'envoi de l\'email:', err); // Affiche l'erreur si l'envoi échoue
            throw err;  // Lance l'erreur pour qu'elle soit capturée dans la route
        });
}

module.exports = { sendEmail };
