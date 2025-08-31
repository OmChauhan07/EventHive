/**
 * Mock Email Service
 * 
 * This is a simplified version of the email service that doesn't actually send emails
 * but logs them to the console and stores them in memory for debugging purposes.
 * Use this for development and testing when actual email delivery is not required.
 */

const crypto = require('crypto');

// Store sent emails in memory for debugging
const sentEmails = [];

// Generate a random 4-digit OTP
const generateOTP = () => {
    return crypto.randomInt(1000, 9999).toString();
};

// Mock sending an OTP email
const sendOTPEmail = async (email, otp) => {
    try {
        const subject = 'Email Verification OTP - EventHive';
        const text = `Welcome to EventHive!

Your email verification code is: ${otp}

This code will expire in 10 minutes.

If you didn't request this code, please ignore this email.`;
        
        console.log('\n==== MOCK EMAIL SERVICE ====');
        console.log(`TO: ${email}`);
        console.log(`SUBJECT: ${subject}`);
        console.log('\nBODY:');
        console.log(text);
        console.log('\n==== END OF EMAIL ====\n');
        
        // Store the email for debugging
        sentEmails.push({
            to: email,
            subject,
            text,
            otp,
            timestamp: new Date()
        });
        
        return true;
    } catch (error) {
        console.error('Error in mock email service:', error);
        return false;
    }
};

// Get all sent emails (for debugging)
const getSentEmails = () => {
    return sentEmails;
};

// Clear sent emails history
const clearSentEmails = () => {
    sentEmails.length = 0;
    return true;
};

module.exports = {
    generateOTP,
    sendOTPEmail,
    getSentEmails,
    clearSentEmails
};