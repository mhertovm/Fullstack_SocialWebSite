require('dotenv').config();
const nodemailer = require('nodemailer');
const port = process.env.PORT;
function sendMail(email, verificationCode) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Sending Email using Node.js',
        text: `Your code: ${verificationCode} \nor for verify click here http://localhost:${port}/public/verify?email=${email}&code=${verificationCode}`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};
module.exports = {sendMail}