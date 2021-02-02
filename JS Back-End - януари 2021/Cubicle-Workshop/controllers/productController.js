const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');


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
    let cube = await productService.getByIdWithAccessories(req.params.productId);
    let accessories = cube.accessories;

    res.render('details', { title: 'Product Details', cube, accessories });
})

router.get('/:productId/attach', async (req, res) => {
    let cube = await productService.getById(req.params.productId);
    let accessories = await accessoryService.getAllUnattached(cube.accessories);

    res.render('attachAccessory', { title: 'Attach Accessory', cube, accessories });
})

router.post('/:productId/attach', async (req, res) => {
    await productService.attachAccesory(req.params.productId, req.body.accessory);

    res.redirect(`/products/details/${req.params.productId}`);
})

module.exports = router;