const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const teacherwishliststudentSchema = new Schema({
    teacherwishstudent_id: {
        type:String,
        required:true,
    },
    student_id:{
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
    dob:{
        type:String,
        required:true,
    },
    grade:{
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
    subject:{
        type:String,
        required:true,
    },
    tution_slot:{
        type:String,
        required:true,
    },
    gname:{
        type:String,
        required:true,
    },
    gphone:{
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
    password:{
        type:String,
        required:true,
    },
    credits:{
        type:String,
        required:true
    }
   
});


const TeacherWishlistStudentModel = db.model('teacherwishListStudent',teacherwishliststudentSchema);

module.exports = TeacherWishlistStudentModel;