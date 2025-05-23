import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import DevUser from "../../../models/DevUser";
import bcrypt from "bcryptjs";

// POST /api/client/register
export async function POST(req: Request) {
  await connectDB();

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await DevUser.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new DevUser({
      email,
      password: hashedPassword,
      apiKey: generateApiKey(),
    });

    await newUser.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

function generateApiKey() {
  return Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
}
