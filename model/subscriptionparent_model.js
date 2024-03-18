const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const ParentSubscriptionSchema = new Schema({
  
  sub_id: {
    type: String,
    required: true,
  },

  parent_id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  plan_name: {
    type: String,
    required: true,
  },
  plancost: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  tnx_id: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  count: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
});

const ParentPlanModel = db.model("parentplan", ParentSubscriptionSchema);

module.exports = ParentPlanModel;
