const ViewTutorModel = require("../model/viewedTutor_model");

class viewTutor_service {
  static async ViewTutor(tutor_id, viewed) {
    try {
      const existing = await ViewTutorModel.findOne({ tutor_id });

      if (existing) {
        return existing;
      }
      const create = new ViewTutorModel({ tutor_id, viewed });
      return await create.save();
    } catch (error) {
      throw error;
    }
  }

  static async get(tutor_id){
    try {
        
        return await ViewTutorModel.findOne({tutor_id})
    } catch (error) {
        throw error
    }
}
}

module.exports = viewTutor_service;
