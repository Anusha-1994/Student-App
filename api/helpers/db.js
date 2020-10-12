const mongoose  = require('mongoose');
const constants = require('../config/constants')
mongoose.connect(constants.connection_string, { 
    useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true,useFindAndModify: false
});

module.exports = {
    Student            :  require('../models/student.model') 
};