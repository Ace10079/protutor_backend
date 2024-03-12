const VerificationService = require("../service/verification_service");

exports.documents = async (req, res, next) => {
  try {
    const { tutor_id ,comment} = req.body;
    const { cv, certificate, id_proof, address_proof } = req.files;

    const document = await VerificationService.documents(
      tutor_id,
      cv[0].filename,
      certificate[0].filename,
      id_proof[0].filename,
      address_proof[0].filename,
      comment
    );

    res.status(200).json("true");
  } catch (error) {
    next(error);
  }
};

exports.CommentUpdate = async (req,res,next) => {
  try {
      const {tutor_id} = req.query
      const { comment} = req.body;
      const updateOne = await VerificationService.CommentUpdate(tutor_id,comment);
      res.status(200).json(updateOne);
  } catch (error) {
      console.error(error);
      res.status(500).json({error:"Internal Server Error"});
  }
}

exports.get = async (req, res, next) => {
  try {
    const { tutor_id } = req.query;
    const data = await VerificationService.getTutorId(tutor_id);
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
};
