import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import DevUser from "../../../models/DevUser";
import jwt, { SignOptions } from "jsonwebtoken";

interface Token {
  token: string;
  expiresAt: Date | number;
}

interface UserDocument {
  _id: string;
  email: string;
  tokens?: Token[];
  save: () => Promise<UserDocument>;
}

interface ApiResponse {
  message?: string;
  token?: string;
  success?: boolean;
}

export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {
  try {
    await connectDB();

    // Parse request body with basic validation
    const { token, email } = await req.json();
    if (!token || !email) {
      return NextResponse.json(
        { message: "Token and email are required" },
        { status: 400 }
      );
    }

    // Find user with type safety
    const user = await DevUser.findOne({ email }).maxTimeMS(5000) as UserDocument | null;
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Validate token exists and is not expired
    const validToken = user.tokens?.find((t: Token) => {
      const expirationTime = new Date(t.expiresAt).getTime();
      return t.token === token && expirationTime > Date.now();
    });

    if (!validToken) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Remove used token with check for tokens
    if (!user.tokens) {
      throw new Error("User tokens missing");
    }
    user.tokens = user.tokens.filter((t: Token) => t.token !== token);
    await user.save();

    // Verify JWT_SECRET is available
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    // Generate JWT
    const jwtToken = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET!,
  {
    expiresIn: process.env.JWT_EXPIRY || "1h",
  } as SignOptions
);

    return NextResponse.json({ 
      token: jwtToken,
      success: true 
    });

  } catch (error: unknown) {
    console.error("Verification error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    const status = errorMessage.includes("timeout") ? 504 : 500;

    return NextResponse.json(
      { 
        message: errorMessage.includes("JWT_SECRET") ? 
          "Server configuration error" : 
          "Internal server error" 
      },
      { status }
    );
  }
}
