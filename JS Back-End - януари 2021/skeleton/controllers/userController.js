const router = require('express').Router();
const userService = require('../services/userService');
const {COOKIE_NAME} = require('../config/config');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    let { username, password } = req.body;
    userService.login(username, password)
        .then(token => {
            res.cookie(COOKIE_NAME, token, { httpOnly: true });
            res.redirect('/');
        })
        .catch(next);
});

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
})

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res, next) => {
    let { username, password } = req.body;

    userService.register(username, password)
        .then(createdUser => {
            res.redirect('/users/login');
        })
        .catch(next);
});

module.exports = router;