const mongoose = require('mongoose')
const db = require('../config/db')

const {Schema} = mongoose;

const VerificationSchema = new Schema({
    tutor_id:{
        type : String,
        required : true
    },
    cv :{
        type: String,
        default:""
    },
    certificate:{
        type: String,
        default:""
    },
    id_proof:{
        type: String,
        default:""
    },
    address_proof:{
        type: String,
        default:""
    },
    comment:{
        type : String,
        default:''
    }
})

const VerficationModel = db.model('verification',VerificationSchema);
module.exports = VerficationModel;