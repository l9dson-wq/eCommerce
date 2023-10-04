const session = require('express-session');

const userLogout = (req, res) => {
    req.session.destroy(error => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/login');
        }
    });
};

module.exports = userLogout;