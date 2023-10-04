const session = require('express-session');
const { user } = require('../../models/modelsInitialization');

const emailConfirmed = async (req, res) => {

  const userEmailForConfirmation = req.query.userEmail;

  // console.log(userEmailForConfirmation); 

  const userFoundByEmail = await user.find({ email: userEmailForConfirmation });

  //console.log("🚀 ~ file: emailConfirmed_controller.js:11 ~ emailConfirmed ~ userFoundByEmail:", userFoundByEmail)

  if ( userFoundByEmail.length > 0 ) { 
  
    //console.log("🚀 ~ file: emailConfirmed_controller.js:15 ~ emailConfirmed ~ userFoundByEmail:", userFoundByEmail)
    
    //Si el usuario ya confirmo el correo entonces lo enviamos a la pagina del login
    if ( userFoundByEmail[0].emailConfirmed == 'yes' ) {
      return res.redirect('/login');
    }

    await user.findByIdAndUpdate( 
      userFoundByEmail[0]._id, 
      { emailConfirmed: 'yes' }, 
      { new: true }
    );

  }

  res.render('email/emailConfirmed', {
    title: 'Email confirmation',
    layout: 'layouts/main',
  });

};

module.exports = emailConfirmed;