const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const parentViewSchema = new Schema({
    parent_id: {
        type:String,
        required:true,
    },
    viewed : {
        type: [String],
    }
});



const ViewParentModel = db.model('ViewParent',parentViewSchema);

module.exports = ViewParentModel;
