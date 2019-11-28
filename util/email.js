const nodeMailer = require("nodemailer");

const sendEmail = async (options) =>{
    //1) Create Transporter
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USERNAME, // generated ethereal user
          pass: process.env.EMAIL_PASSWORD // generated ethereal password
        }
      });
    //2) Email Content
    const mailContent = {
      from: 'TravelTour <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>" // html body
    }
    //let info = await transporter.sendMail(

    //3) Send the Email
    // send mail with defined transport object

}
