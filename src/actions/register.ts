"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schema";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendEmail } from "@/lib/email";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser)
    return {
      error: "Email already exist",
    };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  const confirmLink = `http://localhost:3000/auth/new-verification?token=${verificationToken.token}`;

  const html = `
  <p>Click
    <a href='${confirmLink}' target='_blank'>Confirm Link </a>
    to confirm email.
  </p>
  `;
  await sendEmail({
    sendTo: verificationToken.email,
    subject: "Confirm your Email",
    text: "Confirm your email",
    html,
  });

  return { success: "Confirmation Email Sent!" };
};
