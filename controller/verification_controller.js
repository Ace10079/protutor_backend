const TeacherModel = require("../model/teacher_model");
const VerificationService = require("../service/verification_service");
const sendEmail = require("../utils/email");


exports.documents = async (req, res, next) => {
  try {
    const { tutor_id, comment } = req.body;
    let { cv, certificate, id_proof, address_proof } = req.files;

    cv = cv ? cv[0].filename : "";
    certificate = certificate ? certificate[0].filename : "";
    id_proof = id_proof ? id_proof[0].filename : "";
    address_proof = address_proof ? address_proof[0].filename : "";

    const document = await VerificationService.documents(
      tutor_id,
      cv,
      certificate,
      id_proof,
      address_proof,
      comment
    );

    res.status(200).json("true");
  } catch (error) {
    next(error);
  }
};

exports.CommentUpdate = async (req, res, next) => {
  try {
    const { tutor_id } = req.query;
    const { comment } = req.body;
    const updateOne = await VerificationService.CommentUpdate(
      tutor_id,
      comment
    );
    res.status(200).json(updateOne);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const generateEmailContent = (status, comment) => {

  const commentText = comment ? `<strong>Comment:</strong> ${comment}` : 'Documents verified successfully.';

  const commentpending = comment ? `<strong>Comment:</strong> ${comment}` : 'Documents Recjected.Try again later!';
  if (status === 'pending') {
    return `
      <p>Dear Tutor,</p>
      <p>We regret to inform you that your tutor verification status has been rejected.</p>
      <p>${commentpending}</p>
      <p>If you have any questions or need further assistance, please feel free to contact us.</p>
      <p>Best regards,<br>ProTutor Team</p>
    `;
  } else if (status === 'verified') {
    return `
      <p>Dear Tutor,</p>
      <p>We are pleased to inform you that your tutor verification status has been approved successfully.</p>
       <p>${commentText}</p>
      <p>If you have any questions or need further assistance, please feel free to contact us.</p>
      <p>Best regards,<br>ProTutor Team</p>
    `;
  }
};


exports.verifyUpdate1 = async (req, res, next) => {
  try {
    const { tutor_id } = req.query;
    const { comment } = req.body;
    const updateOne = await VerificationService.CommentUpdate(tutor_id, comment);

    // Fetch the tutor's email address
    const tutor = await TeacherModel.findOne({ tutor_id });
    if (!tutor) {
      return res.status(404).json({ error: 'Tutor not found' });
    }
    const tutorEmail = tutor.email; // Adjust based on your model's structure
    const status = tutor.verification
    console.log(status);

    // Send email notification with the comment
    const subject = `Tutor Verification Status - ${status === 'pending' ? 'pending' : 'verified'}`;
    const html = generateEmailContent(status, comment);
    await sendEmail(tutorEmail, subject, html);

    res.status(200).json(updateOne);
  } catch (error) {
    console.error('Error in verifyUpdate1:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.get = async (req, res, next) => {
  try {
    const { tutor_id } = req.query;
    const data = await VerificationService.getTutorId(tutor_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.updateDocs = async (req, res, next) => {
  try {
    const { tutor_id } = req.query;
    const { cv, certificate, id_proof, address_proof } = req.files;

    const update = await VerificationService.updatedocuments(
      tutor_id,
      cv ? cv[0].filename : null,
      certificate ? certificate[0].filename : null,
      id_proof ? id_proof[0].filename : null,
      address_proof ? address_proof[0].filename : null
    );
    res.status(200).json(update);
  } catch (error) {
    next(error);
  }
};
