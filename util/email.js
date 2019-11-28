const nodeMailer = require("nodemailer");

const sendEmail = async (options) =>{
    //1) Create Transporter
    let transporter = nodeMailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USERNAME, // generated ethereal user
          pass: process.env.EMAIL_PASSWORD // generated ethereal password
        }
      });
    //2) Email Content
    const mailContent = options
    
    //3) Send the Email
    await transporter.sendMail(mailContent);
}

module.exports = sendEmail