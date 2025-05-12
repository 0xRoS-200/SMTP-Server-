require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendMail() {
    const transporter = nodemailer.createTransport({
        host: "localhost",
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        const info = await transporter.sendMail({
            from: `"Rohit Singh" <${process.env.SMTP_USER}>`,
            to: "recipient@example.com",
            subject: "Test Email",
            text: "This is a test message from my custom SMTP server.",
            html: "<b>This is a test message from my custom SMTP server.</b>"
        });
        console.log("[INFO] Message sent:", info.messageId);
    } catch (error) {
        console.error("[ERROR] Error sending email:", error);
    }
}

sendMail();
