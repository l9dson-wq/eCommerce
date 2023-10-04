const { user, product, userProfileDescription } = require("../../models/modelsInitialization");
const fs = require("fs");
const sendRegistrationEmail = require('../helpers/nodemailer');
const bcrypt = require('bcrypt');

const insertUserData = async (req, res) => {
  const { name, lastName, age, country, userName, phone, email, password } =
    req.body;
  
  const file = req.file;

  if (!file) {
    return res.status(404).send("No se encontro ninguna imagen");
  }

  let rutaArchivo = "uploads/pfps/" + file.originalname;

  console.log(rutaArchivo);

  fs.rename(file.path, "public/uploads/pfps/" + file.originalname, (err) => {
    if (err) throw err;
  });

  const rounds = 10;

  bcrypt.hash( password, rounds, async (err, hash) => {
    const newUser = new user({
      name,
      lastName,
      age,
      country,
      userName,
      phone,
      email,
      password: hash,
      imagePath: rutaArchivo,
    });
  
    const newUserProfileDescription = new userProfileDescription({
      userId: newUser._id,
      description: '',
      webSite: '',
      companyName: '',
    });
  
    try {
      const userFind = await user.find({
        $or: [{ userName: userName }, { email: email }],
      });
  
      if (userFind.length > 0) {
        res.redirect("/register?userNameFound=true");
      } else {
        await newUser.save();
        await newUserProfileDescription.save();
        sendRegistrationEmail(name, email);
        res.redirect("/register?registrationSuccess=true");
      }
    } catch (error) {
      console.log("An error occurred:", error);
      res.redirect("/register");
    }
  });

};

module.exports = insertUserData;