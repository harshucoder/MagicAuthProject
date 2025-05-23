import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import User from "../../../models/User";

interface Token {
  token: string;
  expiresAt: Date | string;
}

interface UserDocument {
  email: string;
  tokens: Token[];
  save: () => Promise<UserDocument>;
}

export async function POST(req: Request) {
  await connectDB();

  try {
    const { email, token } = await req.json();
    
    if (!email || !token) {
      return NextResponse.json(
        { success: false, message: "Email and token are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }) as UserDocument | null;
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const validToken = user.tokens.find(
      (t: Token) => t.token === token && new Date(t.expiresAt) > new Date()
    );

    if (!validToken) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Remove the used token
    user.tokens = user.tokens.filter((t: Token) => t.token !== token);
    await user.save();

    return NextResponse.json({
      success: true,
      redirectUrl: `/dashboard?token=${token}&email=${encodeURIComponent(email)}`
    });

  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}