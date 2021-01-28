const handlebars = require('express-handlebars');
const express = require('express');

function setupExpress(app){
    app.engine('hbs', handlebars({
        extname: 'hbs'
    }));
    
    app.use(express.static('public'));
    app.set('view engine', 'hbs');
}

module.exports = setupExpress;