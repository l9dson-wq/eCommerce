const loginController = async (req, res) => {

    res.render('user/login', {
        title: 'login',
        layout: 'layouts/main',
    });
}

module.exports = loginController;