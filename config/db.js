const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://ProtutorAdmin:ProTutor2024@13.54.14.73:27017/tutor_finder?directConnection=true').on('open',() => {
    console.log("MongoDB Connected");
}).on('error',() =>{
    console.log("MongoDB Connection error");
});

module.exports = connection;