const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const { Schema } = mongoose;

const studentSchema = new Schema({
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

studentSchema.pre('save',async function(){
    try {
        var student = this;
        const salt = await(bcrypt.genSalt(10));
        const hashpass = await bcrypt.hash(student.password,salt);

        student.password = hashpass;
    } catch (error) {
        throw error;
    }
});

studentSchema.methods.comparePassword = async function(password){
    try {
        const isMatch = await bcrypt.compare(password,this.password);
        return isMatch;
    } catch (error) {
        throw error
        
    }
}
const StudentModel = db.model('students',studentSchema);

module.exports = StudentModel;