import nodemailer from "nodemailer";

// Reusable transporter for all types
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your App Password
  },
});

/**
 * Sends a magic login link to the provided email.
 * @param email Target email address.
 * @param token One-time token.
 * @param type "user" (default) or "client"
 */
export const sendMagicLink = async (
  email: string,
  token: string,
  type: "user" | "client" = "user"
) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Dynamically choose path based on who is logging in
  const loginPath = type === "client" ? "/client/verify" : "/auth/login";

  const magicLink = `${baseUrl}${loginPath}?token=${token}&email=${encodeURIComponent(email)}`;

  await transporter.sendMail({
    from: `"MagicAuth" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Magic Login Link ✨",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome to MagicAuth 🔐</h2>
        <p>Click the button below to securely sign in to your account:</p>
        <a href="${magicLink}" 
           style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: #ffffff; 
                  text-decoration: none; border-radius: 6px; margin: 20px 0;">
           ➡️ Sign in to your account
        </a>
        <p>If the button above doesn't work, copy and paste this URL into your browser:</p>
        <p><a href="${magicLink}">${magicLink}</a></p>
        <p style="font-size: 0.9em; color: #555;">This link will expire in 10 minutes.</p>
      </div>
    `,
  });
};
