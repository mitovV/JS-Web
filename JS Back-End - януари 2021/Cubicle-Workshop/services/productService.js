const Cube = require('../models/Cube');

async function getAll(query) {

    let { search, from, to } = query;

    let result = await Cube.find().lean();

    if (search) {
        result = result.filter(x => x.name.toLowerCase().includes(search));
    }

    if (from) {
        result = result.filter(x => +x.level >= from)
    }

    if (to) {
        result = result.filter(x => +x.level <= to)
    }

    return result;
}

function getById(id) {
    return Cube.findById(id).lean();
}

function create(data) {
    let cube = new Cube(data);

    return cube.save();
}

module.exports = {
    create,
    getAll,
    getById
}