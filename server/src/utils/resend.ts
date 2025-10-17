import { Resend } from "resend";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOTP(email: string) {
  const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit

  // Send email via Resend
  await resend.emails.send({
    from: "Your App <no-reply@messagingapp.com>",
    to: email,
    subject: "Your verification code",
    html: `
      <p>Your one-time code is:</p>
      <h2>${otp}</h2>
      <p>This code will expire in 1 minute.</p>
    `,
  });

  return otp;
}
