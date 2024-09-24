const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const StreetSchema = new Schema({
    street_name:{
        type: String,
        required: true
    },
    createdby:{
        type: String,
        required : true
    }
},{timestamps : true});

const StreetModel = db.model('street',StreetSchema);

module.exports = StreetModel;