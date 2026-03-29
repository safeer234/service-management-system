import nodemailer from "nodemailer";

const sendInvoiceEmail = async (email, pdfBuffer) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"ServiceHub" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Service Invoice",
    text: "Thank you for your payment. Please find your invoice attached.",
    attachments: [
      {
        filename: "invoice.pdf",
        content: pdfBuffer
      }
    ]
  });
};

export default sendInvoiceEmail;