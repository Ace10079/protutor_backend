const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const { Schema } = mongoose;

const teacherSchema = new Schema({
  tutor_id: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
  },
  qualification: {
    type: String,
  },
  bio: {
    type: String,
  },
  verification: {
    type: String,
    required: true,
  },
  teacherimage: {
    type: String,
    default: " ",
  },
  credits: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
});

teacherSchema.pre("save", async function () {
  try {
    var teacher = this;
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(teacher.password, salt);

    teacher.password = hashpass;
  } catch (error) {
    throw error;
  }
});

// teacherSchema.methods.comparePassword = async function(password){
//     try {
//         const isMatch = await bcrypt.compare(password,this.password);
//         return isMatch;
//     } catch (error) {
//        throw error
//     }
// }

const TeacherModel = db.model("teacher", teacherSchema);

module.exports = TeacherModel;
