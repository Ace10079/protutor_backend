const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const notifySchema = new Schema({
  tutor_id: {
    type: String,
    required: true,
  },
  view_id: {
    type: String,
  },
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: 604800, 
  },
});

notifySchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const NotifyModel = db.model("notify", notifySchema);

module.exports = NotifyModel;
