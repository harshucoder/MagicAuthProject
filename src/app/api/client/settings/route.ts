import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import DevUser from "../../../models/DevUser";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  [key: string]: unknown;
}

interface Settings {
  smtp?: Record<string, unknown>;
  dbUri?: string;
}

function verifyAuth(req: Request): DecodedToken | null {
  const auth = req.headers.get("authorization");
  if (!auth) return null;

  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    return decoded;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  await connectDB();
  const decoded = verifyAuth(req);
  if (!decoded) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await DevUser.findById(decoded.userId);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    apiKey: user.apiKey,
    smtp: user.smtp || {},
    dbUri: user.dbUri || "",
  });
}

export async function POST(req: Request) {
  await connectDB();
  const decoded = verifyAuth(req);
  if (!decoded) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { smtp, dbUri } = (await req.json()) as Settings;
    
    await DevUser.findByIdAndUpdate(decoded.userId, {
      smtp,
      dbUri,
    });

    return NextResponse.json({ message: "Settings updated" });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { message: "Failed to update settings" },
      { status: 500 }
    );
  }
}