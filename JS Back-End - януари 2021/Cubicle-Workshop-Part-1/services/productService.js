const Cube = require('../models/Cube');
const uniqid = require('uniqid');
const products = require('../config/productsDb.json');
const fs = require('fs/promises');
const path = require('path');

function getAll(query){

    let { search, from, to } = query;
    
    let result = products;
    if(search){
        result = result.filter(x => x.name.toLowerCase().includes(search));
    }

    if(from){
        result = result.filter(x => +x.level >= from )
    }

    if(to){
        result = result.filter(x => +x.level <= to )
    }

    return result;
}

function getById(id){
    return products.find(x => x.id === id);
}

function create(data){
    let { name, description, imageUrl, difficultyLevel} = data;
    let cube = new Cube(uniqid(), name, description, imageUrl, difficultyLevel);

    products.push(cube);

    return fs.writeFile(path.join(__dirname, '../config/productsDb.json'), JSON.stringify(products));
}

module.exports = {
    create,
    getAll,
    getById
}