const { Router } = require('express');
const router = Router();
const { COOKIE_NAME } = require('../config/config');
const authService = require('../services/authService');
const isGuest = require('../middlewares/isGuest');
const isAuth = require('../middlewares/isAuthenticated');

router.get('/login', isGuest,(req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login',isGuest, async (req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password });

        res.cookie(COOKIE_NAME, token);
        res.redirect('/products');
    } catch (error) {
        res.render('login', { error });
    }
});

router.get('/register', isGuest,(req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/register',isGuest, async (req, res) => {

    let { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.render('register', { message: 'Password missmatch!' });
    }

    try {
        await authService.register({ username, password });

        res.redirect('/auth/login');
    } catch (error) {
        res.render('register', { error });
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/products');
});

module.exports = router;