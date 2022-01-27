const mongoose = require('mongoose');
require('dotenv').config();

function init(){
    return mongoose.connect(process.env.ME_CONFIG_MONGODB_URL, {
        user: process.env.ME_CONFIG_MONGODB_ADMINUSERNAME,
        pass: process.env.ME_CONFIG_MONGODB_ADMINPASSWORD,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
}

module.exports = {
    init
}

//To escape caracter from inject mysql.escape() / con.escape(), with a mysql instance
