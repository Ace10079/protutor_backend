const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const { Schema } = mongoose;

const AdminSchema = new Schema({
    userid:{
        type: String,
        required: true
    },
    fname:{
        type: String,
        required : true
    },
    lname:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true,
        unique: true    
    },
    phone:{
        type: String,
        required : true,
    },
    role:{
        type:String,
        required:true,
    },
    password:{
        type: String,
        required : true
    },

});

AdminSchema.pre('save', async function(){
    try{
        var admin = this;
        const salt = await(bcrypt.genSalt(10));
        const hashpass = await bcrypt.hash(admin.password,salt);
        admin.password = hashpass;

    }catch(error){
        throw error
    }

});


AdminSchema.methods.comparePasswords = async function(adminPasword){
    try{
        const isMatchAdmin = await bcrypt.compare(adminPasword, this.password);
        return isMatchAdmin;

    }catch(error){
        throw error
    }
}

const AdminModel = db.model('admin',AdminSchema);

module.exports = AdminModel;