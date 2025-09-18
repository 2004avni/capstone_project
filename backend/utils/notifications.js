const nodemailer = require("nodemailer");
const twilio = require("twilio");

async function sendNotification(message) {
  try {
    console.log("📢 Notification Triggered:", message);

    // ----- EMAIL -----
    if (process.env.ALERT_EMAIL && process.env.ALERT_PASS && process.env.ALERT_RECEIVER) {
      try {
        const transporter = nodemailer.createTransport({
          service: "hotmail", // change if Gmail or Yahoo
          auth: {
            user: process.env.ALERT_EMAIL,
            pass: process.env.ALERT_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.ALERT_EMAIL,
          to: process.env.ALERT_RECEIVER,
          subject: "🚨 SOS Alert",
          text: message,
        });

        console.log("✅ Email sent to", process.env.ALERT_RECEIVER);
      } catch (err) {
        console.error("❌ Email sending failed:", err.message);
      }
    }

    // ----- SMS -----
    if (process.env.TWILIO_SID && process.env.TWILIO_TOKEN && process.env.TWILIO_NUMBER && process.env.ALERT_PHONE) {
      try {
        const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

        await client.messages.create({
          body: message,
          from: process.env.TWILIO_NUMBER,
          to: process.env.ALERT_PHONE,
        });

        console.log("✅ SMS sent to", process.env.ALERT_PHONE);
      } catch (err) {
        console.error("❌ SMS sending failed:", err.message);
      }
    }

  } catch (err) {
    console.error("❌ Notification system error:", err.message);
  }
}

module.exports = sendNotification;
