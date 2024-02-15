const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const categoriesSchema = new Schema({
    subject:{
        type:String,
        required:true,
    },
    categoryimage:{
        type: String,
        default:""
    },
});

const CategoriesModel = db.model('categories',categoriesSchema);

module.exports = CategoriesModel;