
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'andelsonlopez13@gmail.com',
    pass: 'hxancndetqwwlwcv',
  }
});

const sendRegistrationEmail = async (name, email) => {

  const mailOptions = {
    from: 'andelsonlopez13@gmail.com',
    to: email,
    subject: 'Bienvenido a TeamStore',
    text: `Hola ${name},\n\nGracias por registrarte en nuestra tienda virtual por favor abre el siguiente link para poder verificar tu cuenta http://localhost:5000/emailVerification?userEmail=${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email has been sent');
  } catch (error) {
    console.log(error);
  }

};

module.exports = sendRegistrationEmail;