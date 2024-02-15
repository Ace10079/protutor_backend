const mongoose = require('mongoose');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const teacherwishlistSchema = new Schema({
    teacherwishid: {
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
teacherwishlistSchema.pre('save',async function() {
    try {
        var teacher = this;
        const salt = await (bcrypt.genSalt(10));
        const hashpass = await bcrypt.hash(teacher.password,salt);

        teacher.password = hashpass;
    } catch (error) {
        throw error;
    }
});

const TeacherWishlistModel = db.model('teacherwishList',teacherwishlistSchema);

module.exports = TeacherWishlistModel;