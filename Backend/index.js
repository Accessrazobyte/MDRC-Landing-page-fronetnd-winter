// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Endpoint to handle form submission
// app.post("/api/book-test", async (req, res) => {
//   const { name, phone, testType, whatsappUpdates, privacyPolicy } = req.body;

//   if (!name || !phone || !testType || !privacyPolicy) {
//     return res.status(400).json({ error: "Please fill all required fields." });
//   }

//   try {
//     // Create a transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//       tls: {
//         rejectUnauthorized: false, 
//       },
//     });

//     // Mail options
//     const mailOptions = {
//       from: `"MDC Lab Booking" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_TO,
//       subject: "🧪 New Test Booking Request",
//       html: `
//         <h2>New Test Booking</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Phone:</strong> ${phone}</p>
//         <p><strong>Test Type:</strong> ${testType}</p>
//         <p><strong>WhatsApp Updates:</strong> ${whatsappUpdates ? "Yes" : "No"}</p>
//         <p><strong>Privacy Policy Accepted:</strong> ${privacyPolicy ? "Yes" : "No"}</p>
//       `,
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ success: true, message: "Email sent successfully." });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ error: "Failed to send email. Try again later." });
//   }
// });

// // Health check
// app.get("/", (req, res) => {
//   res.send("✅ MDC backend is running.");
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });

// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ MDRC backend is running.");
});

// ✅ Booking form endpoint
app.post("/api/book-test", async (req, res) => {
  const { name, phone, city, whatsappUpdates, privacyPolicy } = req.body || {};

  // Validation
    console.log(req.body);

  if (!name || !phone || !city || !privacyPolicy) {
    return res.status(400).json({ error: "Please fill all required fields." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      from: `"MDRC Lab Booking" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO.split(","),
      subject: "🧪 New Landing page Enguiry",
      html: `
        <h2>New Test Booking</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>WhatsApp Updates:</strong> ${whatsappUpdates ? "Yes" : "No"}</p>
        <p><strong>Privacy Policy Accepted:</strong> ${privacyPolicy ? "Yes" : "No"}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email. Try again later." });
  }
});

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
