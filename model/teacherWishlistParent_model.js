const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const teacherwishlistparentSchema = new Schema({
    teacherwishparent_id: {
        type:String,
        required:true,
    },
    parent_id:{
        type:String,
        required:true,
    },
    fname:{
        type:String,
        required:true,
    },
    laname:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        lowercase:true,
        unique:true,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    postcode:{
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    kidname:{
        type:String,
        required:true,
    },
    grade:{
        type:String,
        required:true,
    },
    tution_slot:{
        type:String,
        required:true,
    },
    credits :{
        type:String,
        required:true,
    }
});


const TeacherWishlistParentModel = db.model('teacherwishListParent',teacherwishlistparentSchema);

module.exports = TeacherWishlistParentModel;