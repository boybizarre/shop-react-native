const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, verificationToken) => {
  // create a nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // create the mail message
  const mailOptions = {
    from: 'amazon.com',
    to: email,
    subject: 'Email verification',
    text: `Dear ${email} Please click on the following link to verify your email: http://localhost:8000/verify/${verificationToken}`,
  };

  // send email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('Error sending verification email', error);
  }
};

module.exports = sendVerificationEmail;