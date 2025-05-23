import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import DevUser from "../../../models/DevUser";
import { sendMagicLink } from "../../../lib/mailer";
import crypto from "crypto";

interface Token {
  token: string;
  expiresAt: number;
}

export async function POST(req: Request) {
  try {
    await connectDB();
    
    // Parse request with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout for request parsing
    const { email } = await req.json().catch(() => {
      throw new Error("Invalid request body");
    });
    clearTimeout(timeout);

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Valid email is required" }, 
        { status: 400 }
      );
    }

    // Database operation with timeout
    const user = await DevUser.findOne({ email }).maxTimeMS(5000); // 5s timeout
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    // Update user tokens
    user.tokens = user.tokens || [];
    user.tokens.push({ token, expiresAt });
    await user.save();

    // Send email with retries
    let attempts = 0;
    const maxAttempts = 3;
    let lastError: Error | null = null;

    while (attempts < maxAttempts) {
      try {
        await sendMagicLink(email, token, "client");
        return NextResponse.json(
          { message: "Magic link sent successfully" },
          { status: 200 }
        );
      } catch (err) {
        attempts++;
        lastError = err instanceof Error ? err : new Error("Email sending failed");
        if (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempts)); // Exponential backoff
        }
      }
    }

    // If all attempts failed
    throw lastError || new Error("Failed to send magic link after multiple attempts");

  } catch (error: unknown) {
    console.error("Magic link error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    const status = errorMessage.includes("timeout") ? 504 : 500;

    return NextResponse.json(
      { 
        message: errorMessage.includes("timeout") ? 
          "Request timed out. Please try again." : 
          "Failed to process magic link request" 
      },
      { status }
    );
  }
}