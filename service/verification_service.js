const VerficationModel = require("../model/verification_model");

class VerificationService {
  static async documents(
    tutor_id,
    cv,
    certificate,
    id_proof,
    address_proof,
    comment
  ) {
    try {
      const newdocuments = new VerficationModel({
        tutor_id,
        cv,
        certificate,
        id_proof,
        address_proof,
        comment,
      });

      return await newdocuments.save();
    } catch (error) {
      throw error;
    }
  }

  static async CommentUpdate(tutor_id, comment) {
    try {
      var query = { tutor_id: tutor_id };
      var values = {
        $set: {
          comment: comment,
        },
      };
      return await VerficationModel.updateOne(query, values);
    } catch (error) {
      throw error;
    }
  }

  static async getTutorId(tutor_id) {
    try {
      return await VerficationModel.find({ tutor_id });
    } catch (error) {
      throw error;
    }
  }

static async updatedocuments(tutor_id, cv, certificate, id_proof, address_proof) {
        try {
            const verification = await VerficationModel.findOne({ tutor_id });
            if (!verification) {
                throw new Error("Verification record not found");
            }

            const oldDocs = {
                cv: verification.cv,
                certificate: verification.certificate,
                id_proof: verification.id_proof,
                address_proof: verification.address_proof
            };

            const update = await VerficationModel.findOneAndUpdate(
                { tutor_id },
                { $set: { cv, certificate, id_proof, address_proof } },
                { new: true }
            );

            return { update, oldDocs };
        } catch (error) {
            throw error;
        }
    }

  // static async updatedocuments(
  //   tutor_id,
  //   cv,
  //   certificate,
  //   id_proof,
  //   address_proof
  // ) {
  //   try {
  //     const updateQuery = { tutor_id };
  //     const updateFields = {};

  //     if (cv) {
  //       updateFields.cv = cv;
  //     }
  //     if (certificate) {
  //       updateFields.certificate = certificate;
  //     }
  //     if (id_proof) {
  //       updateFields.id_proof = id_proof;
  //     }
  //     if (address_proof) {
  //       updateFields.address_proof = address_proof;
  //     }

  //     const update = await VerficationModel.findOneAndUpdate(
  //       updateQuery,
  //       { $set: updateFields },
  //       { new: true }
  //     );
  //     return update;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

module.exports = VerificationService;
