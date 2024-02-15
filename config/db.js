const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://0.0.0.0:27017/tutor_finder').on('open',() => {
    console.log("MongoDB Connected");
}).on('error',() =>{
    console.log("MongoDB Connection error");
});

module.exports = connection;