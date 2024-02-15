const mongoose = require('mongoose');
const db = require('../config/db');

const {Schema} = mongoose;

const SubscriptionSchema = new Schema({
    plan_id : {
        type : String,
        required : true
    },
    plan_name : {
        type : String,
        required : true,
    },
    planimage : {
        type : String,
        default : " ",
    },
    plancost : {
        type :String,
        required : true,
    },
    count : {
        type :String,
        required : true,
    }
});

const PlanModel = db.model('plan',SubscriptionSchema);

module.exports = PlanModel;