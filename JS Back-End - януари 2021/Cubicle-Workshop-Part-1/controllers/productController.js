const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');


router.get('/', (req, res) => {
    let products = productService.getAll();

    let { search, from, to } = req.query;
    
    if(search){
        products = products.filter(x => x.name.toLowerCase().includes(search));
    }

    if(from){
        products = products.filter(x => +x.level >= from )
    }

    if(to){
        products = products.filter(x => +x.level <= to )
    }

    res.render('index', {title: 'Home', products});
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
    let cube = productService.getById(req.params.productId);
    
    res.render('details', {title: 'Product Details', cube});
})

module.exports = router;