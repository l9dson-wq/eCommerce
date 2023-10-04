
const countriesAPI = require('../APIs/countries_api');

const registerController = async (req, res) => {

    const countries = await countriesAPI();

    if ( req.session && req.session.user ) {
        res.redirect('/');
    } else {
        res.render('user/register', {
            title: 'Register',
            layout: 'layouts/main',
            countries,
        });
    }

}

module.exports = registerController;