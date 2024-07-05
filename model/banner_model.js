const mongoose = require('mongoose');
const db = require('../config/db');

const {Schema} = mongoose;

const bannerSchema = new Schema({
    banner_id:{
        type : String,
        required : true,
    },
    image:{
        type: String,
        default:""
    },
})

const BannerModel = db.model('banner', bannerSchema);

module.exports = BannerModel;