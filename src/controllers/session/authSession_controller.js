const session = require('express-session');

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user){
        return next();
    } else {
        res.redirect('/login');
    }
};

const isAuthenticatedAsAdmin = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.userType == "admin") {
            return next();
        }
    } else {
        return res.redirect('/');
    }
};

module.exports = {
    isAuthenticated,
    isAuthenticatedAsAdmin,
};