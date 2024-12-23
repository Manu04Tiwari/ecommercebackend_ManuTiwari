const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = new User({ email, password, role, isVerified: false });
    await user.save();

    // Generate Verification Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send Verification Email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Email Verification',
      html: `<h3>Verify Your Email</h3>
             <p>Click the link below to verify your email:</p>
             <a href="${process.env.FRONTEND_URL}/verify-email?token=${token}">Verify Email</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'User registered! Please verify your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};
