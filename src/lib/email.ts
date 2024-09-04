import { sendEmail } from "./nodemailer";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  const html = `
    <p>Click
      <a href='${confirmLink}' target='_blank'>Confirm Link </a>
      to confirm email.
    </p>
    `;

  await sendEmail({
    sendTo: email,
    subject: "Confirm your Email",
    text: "Confirm your email",
    html,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`;

  const html = `
    <p>Click
      <a href='${confirmLink}' target='_blank'>Confirm Link </a>
      to change password.
    </p>
    `;

  await sendEmail({
    sendTo: email,
    subject: "Reset your password",
    text: "Reset your password",
    html,
  });
};
