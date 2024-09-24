const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const LocationSchema = new Schema({
    location_name:{
        type: String,
        required: true
    },
    createdby:{
        type: String,
        required : true
    }
},{timestamps : true});

const LocationModel = db.model('location',LocationSchema);

module.exports = LocationModel;