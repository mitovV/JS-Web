const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');

const register = (username, password) => {
    let user = new User({ username, password });

    return user.save();
};

const login = async (username, password) => {
    let user = await User.findOne({ username });
    const errorObj = { message: 'Invalid username or password', status: 404 };

    if (!user) {
        throw errorObj;
    }

    let areEqual = await bcrypt.compare(password, user.password);

    if(!areEqual){
        throw errorObj;
    }

    let token = jwt.sign({_id: user._id, username: user.username}, SECRET);
    return token;
};

module.exports = {
    register,
    login,
}