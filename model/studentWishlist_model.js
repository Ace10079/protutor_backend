const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const studentwishlistSchema = new Schema({
  studentwish_id: {
    type: String,
    required: true,
  },
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
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
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
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
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
});

const studentWishlistModel = db.model("studentwishlist", studentwishlistSchema);

module.exports = studentWishlistModel;
