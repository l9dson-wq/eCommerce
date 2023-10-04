const {user} = require('../../models/modelsInitialization');
const session = require('express-session');
const bcrypt = require('bcrypt');

const loginUserController = async (req, res) => {

    const { userName, password } = req.body;

    try{

        const usersFind = await user.find({ userName });

        if ( usersFind.length > 0 ) {
            const valid_password = await bcrypt.compare(password, usersFind[0].password);

            console.log(valid_password);

            if (valid_password) {
                console.log('user Found!');

                if ( usersFind[0].emailConfirmed == 'no' ) {
                    return res.redirect('/login?userEmailConfirmed=false');
                }

                //Si se encuentra el usuario se agrega a la sesion:
                const userFound = usersFind[0];

                req.session.user = userFound;

                return res.redirect('/');
            } else {
                console.log('user was not found');

                return res.redirect('/login?userFound=false');
            }
        }else{
                console.log('user was not found');
    
                return res.redirect('/login?userFound=false');
            }

        // if (usersFind.length > 0){
        //     console.log('user Found!');

		// 				if ( usersFind[0].emailConfirmed == 'no' ) {
		// 					return res.redirect('/login?userEmailConfirmed=false');
		// 				}

        //     //Si se encuentra el usuario se agrega a la sesion:
        //     const userFound = usersFind[0];

        //     req.session.user = userFound;

        //     return res.redirect('/');

        // }else{
        //     console.log('user was not found');

        //     return res.redirect('/login?userFound=false');
        // }

    }catch(error){
        console.log(error);
        throw error;
    }
};

module.exports = loginUserController;