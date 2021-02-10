const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

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
function getByIdWithAccessories(id){
    return Cube.findById(id).populate('accessories').lean();
}

function create(data, userId) {
    let cube = new Cube({...data, creator: userId});

    return cube.save();
}

async function attachAccesory(productId, accessoryId){
    let cube = await Cube.findById(productId);
    let accessory = await Accessory.findById(accessoryId);
    
    cube.accessories.push(accessory);
    cube.save();
}

async function updateById(id, data){
   return Cube.updateOne({_id: id}, data);
}

async function deleteById(id){
   return Cube.deleteOne({_id: id});
}

module.exports = {
    create,
    getAll,
    getById,
    attachAccesory,
    getByIdWithAccessories,
    updateById,
    deleteById
}