const { Router } = require('express');
const { create } = require('express-handlebars');
const { route } = require('./homeController');
const router = Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'Home'});
});

router.get('/create', (req, res) => {
    res.render('create', {title: 'Create'});
});

router.post('/create', (req, res) => {
    console.log(req.body);
})

router.get('/details/:productId', (req, res) => {
    res.render('details', {title: 'Product Details'});
})

module.exports = router;