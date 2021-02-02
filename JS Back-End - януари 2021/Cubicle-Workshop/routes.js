const { Router } = require('express');
const router = Router();
const homeController = require('./controllers/homeController');
const productController = require('./controllers/productController');


router.use('/', homeController);
router.use('/products', productController);
router.get('*', (req, res) => {
    res.render('404', {title: 'Not Found'})
})

module.exports = router;
