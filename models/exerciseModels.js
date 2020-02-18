const mongoose = require('mongoose');

const Schame = mongoose.Schema;

const exerciseSchame = new Schame({
    username: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, required: true},
}, {
    timestamps: true
});

const Exercise = mongoose.model('exercise', exerciseSchame);

module.exports = Exercise;