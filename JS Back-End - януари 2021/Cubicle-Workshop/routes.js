const { Router } = require('express');
const router = Router();
const homeController = require('./controllers/homeController');
const productController = require('./controllers/productController');
const accessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');


router.use('/', homeController);
router.use('/products', productController);
router.use('/auth', authController);
router.use('/accessories', accessoryController);
router.get('*', (req, res) => {
    res.render('404', {title: 'Not Found'})
})

module.exports = router;
