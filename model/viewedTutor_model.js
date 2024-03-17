const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const tutorViewSchema = new Schema({
    tutor_id: {
        type:String,
        required:true,
    },
    viewed : {
        type: [String],
    }
});


const ViewTutorModel = db.model('Viewtutor',tutorViewSchema);

module.exports = ViewTutorModel;
