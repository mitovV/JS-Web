const express = require('express');
const app = express();
const config = require('./config/config');
const handlebars = require('express-handlebars');

app.engine('hbs', handlebars({
    extname: 'nbs'
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index', {layout: false});
})

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`));