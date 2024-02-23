const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const StudentSubscriptionSchema = new Schema({
    sub_id: {
        type : String,
        required : true,
    },
    student_id : {
        type : String,
        required : true,
    },
    fname : {
        type : String,
        required : true,
    },
    planname : {
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
    tnxid : {
        type : String,
        required : true,
    },
    date : {
        type : String,
        required : true,
    },
    count : {
        type : String,
        required : true,
    }
});

const StudentPlanModel = db.model('studentPlan',StudentSubscriptionSchema);
module.exports = StudentPlanModel;