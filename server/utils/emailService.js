const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    debug: true, // Enable debug output
    logger: true // Log information about the transport
});

// Generate a random 4-digit OTP
const generateOTP = () => {
    return crypto.randomInt(1000, 9999).toString();
};

// Send OTP via email
const sendOTPEmail = async (email, otp) => {
    try {
        console.log('Attempting to send email to:', email);
        console.log('Using email credentials:', { 
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS ? '******' : 'not set'
        });
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification OTP - EventHive',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4F46E5;">Welcome to EventHive!</h2>
                    <p>Your email verification code is:</p>
                    <h1 style="color: #4F46E5; font-size: 36px; letter-spacing: 5px;">${otp}</h1>
                    <p>This code will expire in 10 minutes.</p>
                    <p>If you didn't request this code, please ignore this email.</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = {
    generateOTP,
    sendOTPEmail
};
