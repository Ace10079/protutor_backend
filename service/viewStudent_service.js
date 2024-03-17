const ViewStudentModel = require("../model/viewedStudent_model");

class viewStudent_service {
  static async ViewStudent(student_id, viewed) {
    try {
      const existing = await ViewStudentModel.findOne({ student_id });

      if (existing) {
        return existing;
      }
      const create = new ViewStudentModel({ student_id, viewed });
      return await create.save();
    } catch (error) {
      throw error;
    }
  }

  static async get(student_id){
    try {
        
        return await ViewStudentModel.findOne({student_id})
    } catch (error) {
        throw error
    }
}
}

module.exports = viewStudent_service;
