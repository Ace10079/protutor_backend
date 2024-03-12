const mongoose = require('mongoose');
const db = require('../config/db');

const {Schema } = mongoose;

const TutorSubscriptionSchema = new Schema({
    email :{
        type : String,
        required : true,
    },
    sub_id :{
        type : String,
        required : true,
    },

    tutor_id : {
        type : String,
        required : true,
    },
    fname : {
        type : String,
        required : true,
    },
    plan_name : {
        type : String,
        required : true,
    },
    plancost : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        required : true,
    },
    tnx_id : {
        type : String,
        required : true,
    },
    date : {
        type : String,
        required : true,
    },
    count :{
        type : String,
        required : true,
    },
    address: {
        type:String,
        required:true,
    }
});

const TutorPlanModel = db.model('tutorplan', TutorSubscriptionSchema );

module.exports = TutorPlanModel;