const Cube = require('../models/Cube');
const uniqid = require('uniqid');
const productsDb = require('../config/productsDb.json');
const fs = require('fs/promises');
const path = require('path');


function create(data){
    let { name, description, imageUrl, difficultyLevel} = data;
    let cube = new Cube(uniqid(), name, description, imageUrl, difficultyLevel);

    productsDb.push(cube);

    return fs.writeFile(path.join(__dirname, '../config/productsDb.json'), JSON.stringify(productsDb));
}

module.exports = {
    create
}