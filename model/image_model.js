const mongoose = require('mongoose');
const db = require('../config/db');

const {Schema} = mongoose;

const imageSchema = new Schema({
    id:{
        type : String,
        required : true,
    },

    img:{
        type: String,
        default:""
    },
})

const ImageModel = db.model('image', imageSchema);

module.exports = ImageModel;