import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config(); // load env first

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ email, subject, message }) => {
  await resend.emails.send({
    from: "ServiceHub <onboarding@resend.dev>",
    to: email,
    subject: subject,
    text: message
  });
};

export default sendEmail;