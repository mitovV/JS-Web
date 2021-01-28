const { Router } = require('express');
const { create } = require('express-handlebars');
const router = Router();

router.get('/', (req, res) => {
    res.render('create', {title: 'Create'})
});

module.exports = router;