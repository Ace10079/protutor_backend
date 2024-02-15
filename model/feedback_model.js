const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const feedbackSchema = new Schema({
    user_id:{
        type:String,
        required:true,
    },
    user_type:{
        type:String,
        required:true,
    },
    tutor_id:{
        type:String,
        required:true,
    },
    ratings:{
        type:String,
        required:true,
    },
    feedback:{
        type:String,
        required:true,
    },
    datetime:{
        type:String,
        required:true,
    },
});

const FeadbackModel = db.model('feadback',feedbackSchema);

module.exports = FeadbackModel;