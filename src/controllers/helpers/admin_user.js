const mongoose = require('mongoose');
const { user, userProfileDescription } = require('../../models/modelsInitialization');
const bcrypt = require('bcrypt');

const create_admin_user = async () => {

    const rounds = 10;
    const password = 'admin1234';

    bcrypt.hash( password, rounds, async (err, hash) => {

        const new_user_obj = new user({
            name: 'admin user',
            lastName: 'manager',
            age: 900,
            country: 'unknown',
            userName: 'admin',
            phone: 8889998989,
            email: 'unknown@unknown.com',
            password: hash,
            imagePath: 'imgs/img3.jpg',
            userType: 'admin',
            emailConfirmed: 'yes',
        });

        const new_user_obj_description = new userProfileDescription({
           userId: new_user_obj._id,
           description: '',
           webSite: '',
           companyName: '', 
        });

        const get_users = await user.find({ userName: 'admin' });

        console.log(get_users.length);

        if ( get_users.length == 0 ) {
            await new_user_obj.save()
                .then(() => console.log('admin user has been created'))
                .catch(err => console.log(err));

            await new_user_obj_description.save()
                .then(() => console.log('admin description has been created'))
                .catch(err => console.log(err));
        } 

        return;
    });

};

module.exports = create_admin_user;