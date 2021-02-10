const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
const isAuthenticated = require('../middlewares/isAuthenticated');


router.get('/', async (req, res) => {
    let products = await productService.getAll(req.query);

    res.render('index', { title: 'Home', products });
});

router.get('/create', isAuthenticated, (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/create', isAuthenticated, (req, res) => {

    productService.create(req.body, req.user._id)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end());
})

router.get('/details/:productId', async (req, res) => {
    let cube = await productService.getByIdWithAccessories(req.params.productId);
    let accessories = cube.accessories;

    res.render('details', { title: 'Product Details', cube, accessories });
})

router.get('/:productId/attach', isAuthenticated, async (req, res) => {
    let cube = await productService.getById(req.params.productId);
    let accessories = await accessoryService.getAllUnattached(cube.accessories);

    res.render('attachAccessory', { title: 'Attach Accessory', cube, accessories });
})

router.post('/:productId/attach', isAuthenticated, async (req, res) => {
    await productService.attachAccesory(req.params.productId, req.body.accessory);

    res.redirect(`/products/details/${req.params.productId}`);
})

router.get('/:productId/edit', isAuthenticated, async (req, res) => {
    let product = await productService.getById(req.params.productId);
    res.render('editCube', product);
})

router.post('/:productId/edit', isAuthenticated, async (req, res) => {
    try {
        await productService.updateById(req.params.productId, req.body);
        res.redirect(`/products/details/${req.params.productId}`);
    } catch (e) {
        console.error(e);
    }

})

router.get('/:productId/delete', isAuthenticated, async (req, res) => {
    let product = await productService.getById(req.params.productId);
    res.render('deleteCube', product);
})

router.post('/:productId/delete', isAuthenticated, async (req, res) => {
    await productService.deleteById(req.params.productId);

    res.redirect('/products');
})

module.exports = router;