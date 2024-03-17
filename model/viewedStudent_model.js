const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const studentViewSchema = new Schema({
    student_id: {
        type:String,
        required:true,
    },
    viewed : {
        type: [String],
    }
});



const ViewStudentModel = db.model('Viewstudent',studentViewSchema);

module.exports = ViewStudentModel;
