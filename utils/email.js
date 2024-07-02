// email.js (or any appropriate filename for email utility)
const nodemailer =require('nodemailer') ;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dev.protutor@gmail.com',
    pass: 'zwip syjh egnu puhm',
  },
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: 'dev.protutor@gmail.com',
    to: to,
    subject: subject,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.log('Error sending email:', error);
  }
};

module.exports = sendEmail;
