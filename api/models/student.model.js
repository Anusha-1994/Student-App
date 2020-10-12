const mongoose = require("mongoose");

let StudentSchema = new mongoose.Schema({
    Name: {
        type: String
    },
    StudentId: {
        type: String
    },
    Course: {
        type: String
    },
    Score: {
        type: Number
    },
    dateOfBirth: {
        type: String
    },
});

module.exports = mongoose.model('Student', StudentSchema);