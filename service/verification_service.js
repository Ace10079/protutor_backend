const VerficationModel = require("../model/verification_model");

class VerificationService {
  static async documents(tutor_id, cv, certificate, id_proof, address_proof,comment) {
    try {
      const newdocuments = new VerficationModel({
        tutor_id,
        cv,
        certificate,
        id_proof,
        address_proof,
        comment
      });

      return  await newdocuments.save()

    } catch (error) {
      throw error;
    }
  }

  static async CommentUpdate(tutor_id,comment){
    try {
        var query = {tutor_id:tutor_id};
        var values = {
            $set:{
                comment:comment,
            }
        };
        return await VerficationModel.updateOne(query,values);
    } catch (error) {
       throw error; 
    }
}

  static async getTutorId(tutor_id){
    try {
        return await VerficationModel.find({tutor_id})
    } catch (error) {
        throw error
    }
}
}



module.exports = VerificationService;
