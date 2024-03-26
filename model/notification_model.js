const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const notifySchema = new Schema({
    tutor_id: {
        type:String,
        required:true,
    },
    view_id : {
        type:String
    },
    fname : {
        type:String
    },
    lname : {
        type:String
    },
   
});

const NotifyModel = db.model('notify',notifySchema);

module.exports = NotifyModel;
