const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');


router.get('/', async (req, res) => {
    let products = await productService.getAll(req.query);

    res.render('index', { title: 'Home', products });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/create', (req, res) => {

    productService.create(req.body)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end());
})

router.get('/details/:productId', async (req, res) => {
    let cube = await productService.getById(req.params.productId);

    res.render('details', { title: 'Product Details', cube });
})

module.exports = router;