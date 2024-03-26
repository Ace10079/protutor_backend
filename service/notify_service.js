const NotifyModel = require("../model/notification_model");

class Notify_service {
  static async get(tutor_id) {
    try {
      return await NotifyModel.find({ tutor_id });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Notify_service;
