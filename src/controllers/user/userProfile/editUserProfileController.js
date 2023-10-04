const session = require("express-session");
const { user, product, imagesCollection, userProfileDescription } = require("../../../models/modelsInitialization");

const editUserProfileController = async (req, res) => {
  
  const userId = req.session.user._id;

  const { newName, companyName, socialLink1, userDescription, } = req.body;

  const newUserProfileDescription = new userProfileDescription({
    userId,
    description: userDescription,
    webSite: socialLink1,
    companyName,
  });

  const getUser = await user.find({ _id: userId });

  if ( newName !== getUser[0].name ) { 

    await user.findByIdAndUpdate( userId, {
      name: newName,
    });

    console.log('user name has been edited correctly!');

  }

  const getUserProfileInformation = await userProfileDescription.find({ userId: userId });
  const userProfileInformationIdGot = getUserProfileInformation[0]._id;

  if ( getUserProfileInformation.length == 0 ) {

    newUserProfileDescription.save()
    .then(() => {
      console.log('user descripcion has been saved');

      return res.redirect(`/user/${userId}/profile`);
    })
    .catch(err => console.log(err));

  } else {

    await userProfileDescription.findByIdAndUpdate( userProfileInformationIdGot, {
      userId,
      description: userDescription,
      webSite: socialLink1,
      companyName,
    } );

    return res.redirect(`/user/${userId}/profile`);

  }

};

module.exports = editUserProfileController;