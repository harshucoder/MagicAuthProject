import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import User from "../../../models/User";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Find user by email
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, tokens: [] });
    } else {
      user.tokens = [];
    }

    // Generate token
    const token = Math.floor(10000 + Math.random() * 90000).toString();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

    user.tokens.push({ token, expiresAt });
    await user.save();

    // Create magic link
    const magicLink = `http://localhost:3000/dashboard?token=${token}&email=${encodeURIComponent(email)}`;

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Magic Auth" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Magic Login Link",
      html: `<p>Click the link below to login:</p><a href="${magicLink}">${magicLink}</a>`,
    });

    console.log(`✅ Magic link sent to ${email}: ${magicLink}`);

    return NextResponse.json({ message: "Magic link sent to your email!" });
  } catch (error) {
    console.error("❌ Error sending magic link:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
