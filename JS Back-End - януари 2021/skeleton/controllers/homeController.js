const router = require('express').Router();
const isAuth = require('../middlewares/isAuth');

router.get('/', isAuth,  (req, res) => {
    res.send('home page')
})

module.exports = router;