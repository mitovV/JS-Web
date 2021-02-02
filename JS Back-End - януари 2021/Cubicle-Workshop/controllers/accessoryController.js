const { Router } = require('express');
const router = Router();
const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
    res.render('createAccessory', {title: 'Create Accessory'});
})

router.post('/create',async (req, res) => {

   await accessoryService.create(req.body);
    res.redirect('/products');
})

module.exports = router;