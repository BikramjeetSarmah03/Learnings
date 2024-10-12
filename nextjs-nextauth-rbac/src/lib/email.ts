import { sendEmail } from "./nodemailer";

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

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
  const confirmLink = `${domain}/auth/new-password?token=${token}`;

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

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const html = `
    <p>
     Your 2FA Code <b>${token}</b>
    </p>
    `;

  await sendEmail({
    sendTo: email,
    subject: "2FA Code",
    text: "2FA Code",
    html,
  });
};
