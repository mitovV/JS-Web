const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');


router.get('/', (req, res) => {
    res.render('index', {title: 'Home'});
});

router.get('/create', (req, res) => {
    res.render('create', {title: 'Create'});
});

router.post('/create', (req, res) => {
 
    productService.create(req.body)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end());
})

router.get('/details/:productId', (req, res) => {
    res.render('details', {title: 'Product Details'});
})

module.exports = router;