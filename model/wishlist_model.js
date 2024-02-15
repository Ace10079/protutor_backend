const mongoose = require('mongoose');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const wishlistSchema = new Schema({
    wishid: {
        type:String,
        required:true,
    },
    tutor_id:{
        type:String,
        required:true,
    },
    fname:{
        type:String,
        required:true,
    },
    lname:{
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
    experience:{
        type:String,
        required:true,
    },
    qualification:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
        required:true,
    },
    verification:{
        type:String,
        required:true,
    },
    teacherimage:{
        type:String,
        default: " ",
    },
    credits :{
        type:String,
        required:true,
    }
});
wishlistSchema.pre('save',async function() {
    try {
        var teacher = this;
        const salt = await (bcrypt.genSalt(10));
        const hashpass = await bcrypt.hash(teacher.password,salt);

        teacher.password = hashpass;
    } catch (error) {
        throw error;
    }
});

const WishlistModel = db.model('wishlist',wishlistSchema);

module.exports = WishlistModel;