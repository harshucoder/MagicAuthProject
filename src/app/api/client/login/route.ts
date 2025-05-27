import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import DevUser from "../../../models/DevUser";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { email, password } = await req.json();

    const user = await DevUser.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.JWT_EXPIRY || "1h",
      } as SignOptions
    );

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
